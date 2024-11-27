import tkinter as tk
from tkinter import messagebox
import requests
import json
import zipfile
import os

def fetch_github_data():
    repo_name = entry.get().strip()
    if not repo_name:
        messagebox.showerror("Ошибка", "Введите имя репозитория!")
        return
    
    url = f"https://api.github.com/repos/{repo_name}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        result = {'company': data.get('owner', {}).get('company'),
                  'created_at': data.get('created_at'),
                  'email': data.get('owner', {}).get('email'),
                  'id': data.get('owner', {}).get('id'),
                  'name': data.get('name'),
                  'url': data.get('owner', {}).get('url')}

        filename = 'github_repo_info.json'
        with open(filename, 'w', encoding='utf-8') as json_file:
            json.dump(result, json_file, ensure_ascii=False, indent=4)

        with zipfile.ZipFile('github_repo_info.zip', 'w') as zipf:
            zipf.write(filename)
        
        os.remove(filename)
        messagebox.showinfo("Успех", f"Данные сохранены в архив: github_repo_info.zip")

    except requests.exceptions.RequestException as e:
        messagebox.showerror("Ошибка", f"Не удалось получить данные: {e}")

root = tk.Tk()
root.title("GitHub Repo Fetcher")

tk.Label(root, text="Введите имя репозитория (формат: owner/repo):").pack(pady=10)
entry = tk.Entry(root, width=40)
entry.pack(pady=5)

tk.Button(root, text="Получить данные", command=fetch_github_data).pack(pady=20)

root.mainloop()
