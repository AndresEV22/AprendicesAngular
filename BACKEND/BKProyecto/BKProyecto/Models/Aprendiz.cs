using System.ComponentModel.DataAnnotations;

namespace BKProyecto.Models
{
    public class Aprendiz
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string IdCard { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string CellPhone { get; set; }
        [Required]
        public string Program { get; set; }
        [Required]
        public string Jornada { get; set; }

    }
}
