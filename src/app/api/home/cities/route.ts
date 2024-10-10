import { City } from '@/features/home/types';
import { fetchWithErrorHandling } from '@/lib/fetch';
import { NextResponse } from 'next/server';

type CityAPIResponse = {
  data: {
    municipalities: {
      code_as_string: string;
      prefecture_code: number;
      name: string;
    }[];
  };
};

export async function GET() {
  const query = `
  query{
  municipalities {
    code_as_string
    prefecture_code
    name
  }
}
`;

  const response = await fetchWithErrorHandling<CityAPIResponse>('https://www.mlit-data.jp/api/v1/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.PREFECTURES_API_KEY ?? '',
    },
    body: JSON.stringify({
      query,
    }),
  });

  const filteredData: City[] = response.data.municipalities.map((city) => ({
    cityCode: city.code_as_string,
    prefCode: city.prefecture_code,
    cityName: city.name,
  }));

  return NextResponse.json({ result: filteredData });
}
