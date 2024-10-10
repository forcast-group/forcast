import { Port } from '@/features/home/types';
import { fetchWithErrorHandling } from '@/lib/fetch';
import { NextResponse } from 'next/server';

type Attributes = {
  漁港名: string;
  読み: string;
  漁港種類: string;
  港則法適用: string;
  所在地: string;
  管理者: string;
  管区: string;
  出典・情報提供者: string;
  データ年度: string;
};

type PortResponse = {
  displayFieldName: string;
  fieldAliases: object;
  geometryType: string;
  spatialReference: { wkid: number; latestWkid: number };
  fields: {
    name: string;
    type: string;
    alias: string;
    length: number;
  }[];
  features: {
    attributes: Attributes;
    geometry: {
      x: number;
      y: number;
    };
  }[];
  exceededTransferLimit: boolean;
};
export async function GET() {
  const response = await fetchWithErrorHandling<PortResponse>(
    'https://api.msil.go.jp/fishing-port-point/v2/MapServer/1/query?f=json&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Meter&returnGeometry=true',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.PORT_API_KEY ?? '',
      },
    },
  );

  const filteredData: Port[] = response.features.map((port) => {
    return {
      name: port.attributes['漁港名'],
      kana: port.attributes['読み'],
      location: port.attributes['所在地'],
      longitude: port.geometry['x'],
      latitude: port.geometry['y'],
    };
  });

  return NextResponse.json({ result: filteredData });
}
