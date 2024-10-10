import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFormProps, getSelectProps } from '@conform-to/react';
import PREFECTURES from '../common/constants/prefectures.json';
import { City, Port, SearchFieldType, SearchFormType } from './types';

type HomePresenterProps = {
  action: (payload: FormData) => void;
  searchForm: SearchFormType;
  searchFields: SearchFieldType;
  cityChoice: City[];
  changeCityChoice: (value: string) => void;
  portChoice: Port[];
  changePortChoice: (value: string) => void;
};
export const HomePresenter: React.FC<HomePresenterProps> = ({
  action,
  searchForm: form,
  searchFields: fields,
  cityChoice,
  changeCityChoice,
  portChoice,
  changePortChoice,
}) => {
  return (
    <form {...getFormProps(form)} action={action}>
      <Label htmlFor={fields.prefecture.id}>都道府県</Label>
      <Select
        {...getSelectProps(fields.prefecture)}
        defaultValue={fields.prefecture.initialValue}
        onValueChange={(value) => changeCityChoice(value)}
      >
        <SelectTrigger id={fields.prefecture.id} aria-invalid={!fields.prefecture.valid || undefined}>
          <SelectValue placeholder="都道府県の選択" />
        </SelectTrigger>
        <SelectContent>
          {PREFECTURES.data.map((prefecture, index) => (
            <SelectItem key={index} value={prefecture.code.toString()}>
              {prefecture.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div id={fields.prefecture.errorId}>{fields.prefecture.errors}</div>

      <Label htmlFor={fields.city.id}>市区町村</Label>
      <Select
        {...getSelectProps(fields.city)}
        defaultValue={fields.city.initialValue}
        disabled={cityChoice.length === 0}
        onValueChange={(value: string) => changePortChoice(value)}
      >
        <SelectTrigger id={fields.city.id}>
          <SelectValue placeholder="市区町村の選択" />
        </SelectTrigger>
        <SelectContent>
          {cityChoice.map((city, index) => (
            <SelectItem key={index} value={city.cityName}>
              {city.cityName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div id={fields.city.errorId}>{fields.city.errors}</div>

      <Label htmlFor={fields.port.id}>漁港名</Label>
      <Select
        {...getSelectProps(fields.port)}
        defaultValue={fields.port.initialValue}
        disabled={portChoice.length === 0}
      >
        <SelectTrigger id={fields.port.id}>
          <SelectValue placeholder="漁港の選択" />
        </SelectTrigger>
        <SelectContent>
          {portChoice.map((port) => (
            <SelectItem key={port.name} value={port.name}>
              {port.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button disabled={!form.dirty}>検索</Button>
    </form>
  );
};
