using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace VoteApp.Services
{

    public class VotesService : IVotesService
    {
        private ConnectionMultiplexer _redis;
        private readonly VoteAppSettings _settings;

        private readonly Random _rand;

        public VotesService(IOptionsSnapshot<VoteAppSettings> settings)
        {
            _settings = settings.Value;
            _rand = new Random();
        }

        public async Task<int> GetVote(string key)
        {
            var databse = await GetDatabase();

            var result = await databse.StringGetAsync(key);

            if (!result.HasValue) return 0;

            int vote;
            result.TryParse(out vote);
            return vote;
        }

        public async Task AddVote(string key, int vote)
        {
            var databse = await GetDatabase();

            var currentVote = await GetVote(key);

            await databse.StringSetAsync(key, currentVote + vote);
        }

        private async Task<IDatabase> GetDatabase()
        {
            if (_redis == null)
            {
                await ConnectToServer();
            }

            return _redis.GetDatabase();
        }

        private async Task ConnectToServer()
        {
            if (IPAddress.TryParse(_settings.ConnectionString, out var ip))
            {
                _redis = await ConnectionMultiplexer.ConnectAsync(ip.ToString());
            }
            else
            {
                // workaround for https://github.com/StackExchange/StackExchange.Redis/issues/410
                var ips = await Dns.GetHostAddressesAsync(_settings.ConnectionString);
                _redis = await ConnectionMultiplexer.ConnectAsync(ips.First().ToString());
            }
        }

        public Battle GetBattle()
        {
            var battles = new List<Battle>
            {
                new Battle{FighterOne = "Dogs", FighterTwo = "Cats"},
                new Battle{FighterOne = "Blue", FighterTwo = "Red"}
            };

            return battles[_rand.Next(battles.Count)];
        }
    }
}