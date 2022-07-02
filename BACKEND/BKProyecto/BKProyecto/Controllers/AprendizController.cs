using BKProyecto.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BKProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AprendizController : ControllerBase
    {
        public readonly ApplicationDbContext _Context;

        public AprendizController(ApplicationDbContext context)
        {
            _Context = context;
        }


        // GET: api/<AprendizController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var listAprendices = await _Context.Aprendiz.ToListAsync();
                return Ok(listAprendices);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // GET api/<AprendizController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AprendizController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Aprendiz aprendiz)
        {
            try
            {
                _Context.Add(aprendiz);
                await _Context.SaveChangesAsync();
                return Ok(aprendiz);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // PUT api/<AprendizController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Aprendiz aprendiz)
        {
            try
            {
                if (id != aprendiz.Id)
                {
                    return NotFound();
                }

                _Context.Update(aprendiz);
                await _Context.SaveChangesAsync();
                return Ok(new { message = "El registro del aprendiz fue actualizado" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<AprendizController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var aprendiz = await _Context.Aprendiz.FindAsync(id);//se busca el registro y se pasa a una variable
                if (aprendiz == null)
                {
                    return NotFound();
                }
                _Context.Aprendiz.Remove(aprendiz);
                await _Context.SaveChangesAsync();
                return Ok(new { message = "Aprendiz eliminado correctamente" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
