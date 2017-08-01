using System.Threading.Tasks;

namespace VoteApp.Services
{
    public interface IVotesService
    {
        Task<int> GetVote(string key);
        
        Task AddVote(string key, int vote);
        
        Battle GetBattle();
    }
}