namespace DataProvider.Core
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text.Json;
    using System.Threading.Tasks;
    using DataProvider.Contract;

    public class ContactsRepository : IContactsRepository
    {
        private readonly string _filePath;

        public ContactsRepository()
        {
            _filePath = Path.Combine(Directory.GetCurrentDirectory(), @"..\..\DataBase\contacts.json");
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            var json = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<Contact>>(json);
        }

        public async Task<Contact> GetContactByIdAsync(int id)
        {
            var contacts = await GetAllContactsAsync();
            return contacts.FirstOrDefault(c => c.Id == id);
        }

        public async Task AddContactAsync(Contact contact)
        {
            var contacts = (await GetAllContactsAsync()).ToList();
            contact.Id = contacts.Count > 0 ? contacts.Max(c => c.Id) + 1 : 1;
            contacts.Add(contact);
            await SaveToFile(contacts);
        }

        public async Task UpdateContactAsync(Contact contact)
        {
            var contacts = (await GetAllContactsAsync()).ToList();
            var existingContact = contacts.FirstOrDefault(c => c.Id == contact.Id);
            if (existingContact != null)
            {
                existingContact.FirstName = contact.FirstName;
                existingContact.LastName = contact.LastName;
                existingContact.Email = contact.Email;
                await SaveToFile(contacts);
            }
        }

        public async Task DeleteContactAsync(int id)
        {
            var contacts = (await GetAllContactsAsync()).ToList();
            var contact = contacts.FirstOrDefault(c => c.Id == id);
            if (contact != null)
            {
                contacts.Remove(contact);
                await SaveToFile(contacts);
            }
        }

        private async Task SaveToFile(IEnumerable<Contact> contacts)
        {
            var json = JsonSerializer.Serialize(contacts, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, json);
        }
    }

}
