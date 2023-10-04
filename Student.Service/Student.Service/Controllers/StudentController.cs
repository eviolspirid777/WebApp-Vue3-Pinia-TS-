using EF_web_app;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student.Service;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EF_web_app.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class StudentController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public StudentController(ApplicationDbContext context)
		{
			_context = context;
			_context.Database.EnsureCreated();                                      //устанавливает связи с БД
		}

		[HttpGet]                                   //Получение списка студентов(+сортировка, + фильтрация)
		public async Task<IActionResult> Get(string? sortByParam, bool sortAsc = true, string? filter = null)
		{
			IQueryable<Student> students = _context.Students.Include(s=> s.City);

			if (!string.IsNullOrEmpty(filter))
			{
				students = students.Where(s => s.Name.ToLower().Contains(filter.ToLower()) ||
																	s.Surname.ToLower().Contains(filter.ToLower()) ||
																	s.Patron.ToLower().Contains(filter.ToLower()) ||
																	s.PostalCode.ToLower().Contains(filter.ToLower()) ||
																	s.City.Country.ToLower().Contains(filter.ToLower()) ||
																	s.Course.ToLower().Contains(filter.ToLower()) ||
																	s.Email.ToLower().Contains(filter.ToLower()) ||
																	s.Faculty.ToLower().Contains(filter.ToLower()) ||
																	s.Group.ToLower().Contains(filter.ToLower()) ||
																	s.Specialty.ToLower().Contains(filter.ToLower()) ||
																	s.Street.ToLower().Contains(filter.ToLower()) ||
																	s.Email.ToLower().Contains(filter.ToLower()) ||
																	s.Phone.ToLower().Contains(filter.ToLower())
																	);
			}
			if (!string.IsNullOrEmpty(sortByParam))
			{
				if (sortAsc)
				{
					students = students.OrderBy(s => EF.Property<object>(s, sortByParam));                      //порядок по ВОЗРАСТАНИЮ
				}
				else
				{
					students = students.OrderByDescending(s => EF.Property<object>(s, sortByParam));                //порядок по УБЫВАНИЮ
				}
			}
			List<Student> studentList = await students.ToListAsync();
			if (studentList.Count == 0)                         //проверка на пустой список (error 404)
			{
				return Ok(studentList);
			}
			return Ok(studentList);                     //возвращаем код 200(Ok) + список студентов
		}

		[HttpGet("cities")]
		public async Task<IActionResult> GetCityCount()
		{
			List <Cities> cities = await _context.Cities.ToListAsync();
			return Ok(cities);
		}

		[HttpPost]                                                  // Добавление студента
		public async Task<IActionResult> Post(Student student)
		{
			student.City = await _context.Cities.FirstOrDefaultAsync(c => c.Country == student.City.Country);
			_context.Students.Add(student);
			await _context.SaveChangesAsync();
			return Ok();                                                                // возвращаем код 200(Ok)
		}
		[HttpPost("cities")]                                                  //Добавление города
		public async Task<IActionResult> PostCity(Cities City)
		{
			_context.Cities.Add(City);
			await _context.SaveChangesAsync();
			return Ok();                                                                //возвращаем код 200(Ok)
		}

		[HttpPut]                                           //Изменение данных о студенте
		public async Task<IActionResult> Put(Student student)
		{
			_context.Entry(student.City).State = EntityState.Modified;
			_context.Entry(student).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return Ok();                                                                            //возвращаем код 200(Ok)
		}
		[HttpPut("cities")]                                           //Изменение данных о городе
		public async Task<IActionResult> PutCity(Cities City)
		{
			_context.Cities.Entry(City).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return Ok();                                                                            //возвращаем код 200(Ok)
		}

		[HttpDelete("{ID}")]                                        //Удаление студента(по id)
		public async Task<IActionResult> Delete(int id)
		{
			var student = await _context.Students.FindAsync(id);
			if (student == null)                                                                            //проверка на пустого студента (error 404)
			{
				return NotFound();
			}
			_context.Students.Remove(student);
			await _context.SaveChangesAsync();
			return Ok();                                                                                                            //возвращаем код 200(Ok)
		}

		[HttpDelete("cities/{ID}")]                                        //Удаление города(по id)
		public async Task<IActionResult> DeleteCities(int id)
		{
			var city = await _context.Cities.FindAsync(id);
			if (city == null)                                                                            //проверка на пустой город (error 404)
			{
				return NotFound();
			}
			_context.Cities.Remove(city);
			await _context.SaveChangesAsync();
			return Ok();                                                                                                            //возвращаем код 200(Ok)
		}
	}
}
