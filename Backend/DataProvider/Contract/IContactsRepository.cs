namespace DataProvider.Contract
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IContactsRepository
    {
        Task<IEnumerable<Contact>> GetAllContactsAsync();
        Task<Contact> GetContactByIdAsync(int id);
        Task AddContactAsync(Contact contact);
        Task UpdateContactAsync(Contact contact);
        Task DeleteContactAsync(int id);
    }

}
