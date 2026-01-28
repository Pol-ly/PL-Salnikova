import React, { useState, useEffect, useCallback } from 'react';
import { Table } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Card } from '@consta/uikit/Card';
import { Modal } from '@consta/uikit/Modal';
import { IconAdd } from '@consta/icons/IconAdd';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconClose } from '@consta/icons/IconClose';

import { customerApi } from './api/api';

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterInn, setFilterInn] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerCode: '',
    customerName: '',
    customerInn: '',
    customerKpp: '',
    customerEmail: '',
    isOrganization: false,
    isPerson: false,
  });

  const loadCustomers = useCallback(async (useFilters = false) => {
    setLoading(true);
    try {
      let response;
      
      if (useFilters && (filterName || filterInn)) {
        response = await customerApi.getFiltered({
          name: filterName || undefined,
          inn: filterInn || undefined,
          sortBy: 'customer_code',
          order: 'asc'
        });
      } else {
        response = await customerApi.getAll();
      }
      
      setCustomers(response.data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setCustomers([
        {
          customer_code: 'TEST001',
          customer_name: 'Тестовая компания',
          customer_inn: '1234567890',
          customer_kpp: '123456789',
          customer_email: 'test@test.com',
          is_organization: true,
          is_person: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [filterName, filterInn]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleDelete = async (code) => {
    if (window.confirm(`Удалить контрагента ${code}?`)) {
      try {
        await customerApi.delete(code);
        alert('Удалено!');
        loadCustomers();
      } catch (error) {
        alert('Ошибка при удалении: ' + (error.response?.data || error.message));
      }
    }
  };

  const handleCreate = async () => {
    try {
      await customerApi.create(formData);
      alert('Создано!');
      setModalOpen(false);
      setFormData({
        customerCode: '',
        customerName: '',
        customerInn: '',
        customerKpp: '',
        customerEmail: '',
        isOrganization: false,
        isPerson: false,
      });
      loadCustomers();
    } catch (error) {
      alert('Ошибка: ' + (error.response?.data || error.message));
    }
  };

  const handleInputChange = (field) => ({ value }) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const columns = [
    { title: 'Код', accessor: 'customer_code', width: 120 },
    { title: 'Название', accessor: 'customer_name', width: 250 },
    { title: 'ИНН', accessor: 'customer_inn', width: 120 },
    { title: 'КПП', accessor: 'customer_kpp', width: 120 },
    { title: 'Email', accessor: 'customer_email', width: 180 },
    {
      title: 'Тип',
      accessor: (row) => row.is_organization ? 'Юр.лицо' : row.is_person ? 'Физ.лицо' : '-',
      width: 100,
    },
    {
      title: 'Действия',
      accessor: (row) => (
        <Button
          size="xs"
          iconLeft={IconTrash}
          onClick={() => handleDelete(row.customer_code)}
          label="Удалить"
          view="ghost"
        />
      ),
      width: 100,
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Справочник контрагентов</h1>
        <Button
          iconLeft={IconAdd}
          onClick={() => setModalOpen(true)}
          label="Добавить контрагента"
        />
      </div>

      <Card style={{ marginBottom: 20, padding: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          <TextField
            label="Название"
            placeholder="Поиск по названию..."
            value={filterName}
            onChange={({ value }) => setFilterName(value)}
            style={{ width: 250 }}
          />
          <TextField
            label="ИНН"
            placeholder="Поиск по ИНН..."
            value={filterInn}
            onChange={({ value }) => setFilterInn(value)}
            style={{ width: 200 }}
          />
          <Button
            onClick={() => loadCustomers(true)}
            label="Найти"
          />
          <Button
            onClick={() => {
              setFilterName('');
              setFilterInn('');
              loadCustomers();
            }}
            label="Сбросить"
            view="ghost"
          />
        </div>
      </Card>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p>Загрузка данных...</p>
        </div>
      ) : (
        <Table
          columns={columns}
          rows={customers}
          borderBetweenColumns
          borderBetweenRows
          zebraStriped="odd"
        />
      )}

      <Modal 
        isOpen={modalOpen} 
        hasOverlay 
        onClickOutside={() => setModalOpen(false)}
        onEsc={() => setModalOpen(false)}
      >
        <Card style={{ width: 500, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ margin: 0 }}>Новый контрагент</h2>
            <Button
              iconLeft={IconClose}
              onClick={() => setModalOpen(false)}
              view="clear"
              onlyIcon
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              label="Код контрагента *"
              value={formData.customerCode}
              onChange={handleInputChange('customerCode')}
            />
            <TextField
              label="Наименование *"
              value={formData.customerName}
              onChange={handleInputChange('customerName')}
            />
            <TextField
              label="ИНН *"
              value={formData.customerInn}
              onChange={handleInputChange('customerInn')}
            />
            <TextField
              label="КПП"
              value={formData.customerKpp}
              onChange={handleInputChange('customerKpp')}
            />
            <TextField
              label="Email"
              value={formData.customerEmail}
              onChange={handleInputChange('customerEmail')}
            />
            
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <Button
                onClick={() => setFormData({ ...formData, isOrganization: true, isPerson: false })}
                label="Юридическое лицо"
                view={formData.isOrganization ? "primary" : "ghost"}
                style={{ flex: 1 }}
              />
              <Button
                onClick={() => setFormData({ ...formData, isOrganization: false, isPerson: true })}
                label="Физическое лицо"
                view={formData.isPerson ? "primary" : "ghost"}
                style={{ flex: 1 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
              <Button 
                onClick={() => setModalOpen(false)} 
                label="Отмена" 
                view="ghost" 
              />
              <Button 
                onClick={handleCreate} 
                label="Создать"
                disabled={!formData.customerCode || !formData.customerName || !formData.customerInn}
              />
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );  
}