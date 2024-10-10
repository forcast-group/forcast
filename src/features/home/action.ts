'use server';

import { redirect } from 'next/navigation';

export const search = (prevState: unknown, formData: FormData) => {
  redirect('/searchResult');
};
