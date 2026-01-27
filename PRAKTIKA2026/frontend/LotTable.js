import React, { useState, useEffect } from 'react';
import { Table } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Card } from '@consta/uikit/Card';
import { Modal } from '@consta/uikit/Modal';
import { Select } from '@consta/uikit/Select';

import { IconAdd } from '@consta/icons/IconAdd';

import { lotApi } from './api/api';

export default function LotTable() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    lotName: '',
    customerCode: '',
    price: '',
    currencyCode: 'RUB',
    ndsRate: '20%',
    placeDelivery: '',
    dateDelivery: '',
  });

  // Загрузка лотов
  const loadLots = async () => {
    setLoading(true);
    try {
      const response = await lotApi.getAll();
      setLots(response.data);
    } catch (error) {
      console.error('Ошибка загрузки лотов:', error);
      alert('Ошибка при загрузке лотов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLots();
  }, []);

  // Создание лота
  const handleCreate = async () => {
    try {
      await lotApi.create({
        ...formData,
        price: formData.price ? Number(formData.price) : null,
        dateDelivery: formData.dateDelivery || null,
      });
      alert('Лот создан!');
      setModalOpen(false);
      setFormData({
        lotName: '',
        customerCode: '',
        price: '',
        currencyCode: 'RUB',
        ndsRate: '20%',
        placeDelivery: '',
        dateDelivery: '',
      });
      loadLots();
    } catch (error) {
      alert('Ошибка: ' + (error.response?.data || error.message));
    }
  };

  // Колонки таблицы
  const columns = [
    { title: 'Название', accessor: 'lot_name', width: 200 },
    { title: 'Код контрагента', accessor: 'customer_code', width: 150 },
    { title: 'Цена', accessor: 'price', width: 100 },
    { title: 'Валюта', accessor: 'currency_code', width: 80 },
    { title: 'НДС', accessor: 'nds_rate', width: 80 },
    { title: 'Грузополучатель', accessor: 'place_delivery', width: 200 },
    {
      title: 'Дата доставки',
      accessor: (row) => row.date_delivery 
        ? new Date(row.date_delivery).toLocaleDateString() 
        : '-',
      width: 120,
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Список лотов</h1>
        <Button
          iconLeft={IconAdd}
          onClick={() => setModalOpen(true)}
          label="Добавить лот"
        />
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <Table
          columns={columns}
          rows={lots}
          borderBetweenColumns
          borderBetweenRows
        />
      )}

      <Modal isOpen={modalOpen} hasOverlay onClickOutside={() => setModalOpen(false)}>
        <Card style={{ width: 500, padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 24 }}>Новый лот</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              label="Название лота *"
              value={formData.lotName}
              onChange={({ value }) => setFormData({ ...formData, lotName: value })}
              required
            />
            <TextField
              label="Код контрагента *"
              value={formData.customerCode}
              onChange={({ value }) => setFormData({ ...formData, customerCode: value })}
              required
            />
            <TextField
              label="Цена"
              value={formData.price}
              onChange={({ value }) => setFormData({ ...formData, price: value })}
              type="number"
            />
            
            <Select
              label="Валюта"
              items={[
                { label: 'RUB', value: 'RUB' },
                { label: 'USD', value: 'USD' },
                { label: 'EUR', value: 'EUR' },
              ]}
              value={formData.currencyCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currencyCode: e?.value ?? 'RUB'
                })
              }
            />
            
            <Select
              label="Ставка НДС"
              items={[
                { label: 'Без НДС', value: 'Без НДС' },
                { label: '18%', value: '18%' },
                { label: '20%', value: '20%' },
              ]}
              value={formData.ndsRate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ndsRate: e?.value ?? '20%'
                })
              }
            />
            
            <TextField
              label="Грузополучатель"
              value={formData.placeDelivery}
              onChange={({ value }) => setFormData({ ...formData, placeDelivery: value })}
            />
            
            <TextField
              label="Дата доставки"
              type="datetime-local"
              value={formData.dateDelivery}
              onChange={({ value }) => setFormData({ ...formData, dateDelivery: value })}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
              <Button onClick={() => setModalOpen(false)} label="Отмена" view="ghost" />
              <Button 
                onClick={handleCreate} 
                label="Создать"
                disabled={!formData.lotName || !formData.customerCode}
              />
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
