'use client';
import { useForm } from '@conform-to/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { search } from './action';
import { HomePresenter } from './homePresenter';
import { useGetCity } from './hooks/useGetCity';
import { useGetPort } from './hooks/useGetPort';
import { City, Port, SearchFormData } from './types';

export const HomeContainer = () => {
  const [lastResult, action] = useFormState(search, undefined);
  const [searchForm, searchFields] = useForm<SearchFormData>({
    lastResult,
    defaultValue: {
      prefecture: '',
      city: '',
      port: '',
    },
  });

  const { data: cities, error: cityError, isLoading: isGetCityLoading } = useGetCity();
  const { data: ports, error: portError, isLoading: isGetPortLoading } = useGetPort();

  const [cityChoice, setCityChoice] = useState<City[]>([]);
  const [portChoice, setPortChoice] = useState<Port[]>([]);

  if (cityError || portError || isGetCityLoading || isGetPortLoading) return;

  // NOTE: 都道府県が選ばれたタイミングで市町村の選択肢をフィルターする
  const changeCityChoice = (value: string) => {
    if (cities?.result) {
      const filteredCities = cities.result.filter((city) => city.prefCode === Number(value));
      setCityChoice(filteredCities);
    }
  };

  // NOTE: 市町村が選ばれたタイミングで皆との選択肢をフィルターする
  const changePortChoice = (value: string) => {
    if (ports?.result) {
      const filteredPorts = ports.result.filter((port) => port.location.includes(value));
      setPortChoice(filteredPorts);
    }
  };

  const args = {
    action,
    searchForm,
    searchFields,
    cityChoice,
    changeCityChoice,
    portChoice,
    changePortChoice,
  };
  return <HomePresenter {...args} />;
};
