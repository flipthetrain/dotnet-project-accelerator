﻿using AutoMapper;
using DNPA.Business.Models;
using DNPA.Models;
using DNPA.Repositories;
using DNPA.Repositories.Models;
using LinqKit;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DNPA.Business
{
    public class CountriesManager
    {
        private readonly IMapper _mapper;
        private readonly IRepository<CountryEntity> _repository;

        public CountriesManager(IMapper mapper, IRepository<CountryEntity> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<List<Country>> GetByContinentCode(string continentCode)
        {
            var condition = PredicateBuilder.New<CountryEntity>(true);
            condition.Start(c => c.ContinentCode == continentCode);
            var countriesEntities = await _repository.FindMany(condition);
            var countries = _mapper.Map<List<Country>>(countriesEntities);
            return countries;
        }

        public async Task<List<Country>> Search(string searchTerm)
        {
            var condition = PredicateBuilder.New<CountryEntity>(true);
            condition.Start(c => c.CountryName.Contains(searchTerm));
            var countriesEntities =  await _repository.FindMany(condition);
            var countries = _mapper.Map<List<Country>>(countriesEntities);
            return countries;
        }

        public async Task<PagedResponse<Country>> Paged(CountriesPaged paged)
        {
            var condition = PredicateBuilder.New<CountryEntity>(true);
            Func<IQueryable<CountryEntity>, IOrderedQueryable<CountryEntity>> orderBy =
  query => query.OrderBy(c => c.CountryName);

            var countriesEntities = await _repository.FindManyOrderedPaged(condition, orderBy, paged.CurrentPage, paged.PageSize);
            var countries = _mapper.Map<PagedResponse<Country>>(countriesEntities);
            return countries;
        }

    }
}
