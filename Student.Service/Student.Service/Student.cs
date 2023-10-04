using Student.Service;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace EF_web_app
{
	[Table("students")]
	public class Student
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[DataMember(Name = "id")]
		public int id { get; set; }
		[DataMember(Name = "name")]
		public string Name { get; set; }
		[DataMember(Name = "surname")]
		public string Surname { get; set; }
		[DataMember(Name = "patron")]
		public string Patron { get; set; }
		[DataMember(Name = "faculty")]
		public string Faculty { get; set; }
		[DataMember(Name = "specialty")]
		public string Specialty { get; set; }
		[DataMember(Name = "course")]
		public string Course { get; set; }
		[DataMember(Name = "group")]
		public string Group { get; set; }
		[DataMember(Name = "city")]
		public Cities City { get; set; }
		[DataMember(Name = "postalcode")]
		public string PostalCode { get; set; }
		[DataMember(Name = "street")]
		public string Street { get; set; }
		[DataMember(Name = "phone")]
		public string Phone { get; set; }
		[DataMember(Name = "email")]
		public string Email { get; set; }
	}
}
