import React from 'react';
import { Button, Typography } from 'antd';
import { IconFlag } from '@tabler/icons-react';

export function Page() {
  return (
    <div className="h-full mx-auto grid place-items-center text-center px-8">
      <div>
        <IconFlag className="w-20 h-20 mx-auto" />
        <Typography
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </Typography>
        <Button className="w-full px-4 md:w-[8rem]">Back home</Button>
      </div>
    </div>
  );
}

export default Page;
