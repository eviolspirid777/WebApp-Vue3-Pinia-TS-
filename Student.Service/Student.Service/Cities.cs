using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Student.Service
{
	[Table("cities")]
	public class Cities
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[DataMember(Name ="id")]
		public int Id { get; set; }
		[DataMember(Name ="country")]
		public string Country { get; set; }
	}
}
