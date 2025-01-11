// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    using DataProvider.Contract;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowLocalhost4200")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsRepository _contactsRepository;

        public ContactsController(IContactsRepository contactsRepository)
        {
            _contactsRepository = contactsRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _contactsRepository.GetAllContactsAsync();
            return Ok(contacts);
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(Contact contact)
        {
            await _contactsRepository.AddContactAsync(contact);
            return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            await _contactsRepository.UpdateContactAsync(contact);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            await _contactsRepository.DeleteContactAsync(id);
            return NoContent();
        }
    }

}
