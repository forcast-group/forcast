import { FieldMetadata, FormMetadata } from '@conform-to/react';

export type SearchFormData = {
  prefecture: string;
  city: string;
  port: string;
};

export type SearchFormType = FormMetadata<SearchFormData, string[]>;
export type SearchFieldType = Required<{
  prefecture: FieldMetadata<string, SearchFormData, string[]>;
  city: FieldMetadata<string, SearchFormData, string[]>;
  port: FieldMetadata<string, SearchFormData, string[]>;
}>;

export type City = {
  cityCode: string;
  prefCode: number;
  cityName: string;
};

export type Port = {
  name: string;
  kana: string;
  location: string;
  longitude: number;
  latitude: number;
};
