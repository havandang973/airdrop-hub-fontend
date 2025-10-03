import React, { useState } from 'react';
import { Table as AntdTable, Card, ConfigProvider, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from 'next-themes';
import GradientSlider from './Slider';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface RowData {
  key: string;
  name: string;
  logo: string;
  slug: string;
  raise: string;
  stage: string;
  fundsAndInvestors: string;
  fundLogo: string;
  date: string;
  moniScore: number;
}

const data: RowData[] = [
  {
    key: '1',
    name: 'Beatdapp',
    slug: 'beatdapp',
    logo: 'https://img.cryptorank.io/coins/60x60.flying_tulip1759177295560.png',
    raise: '$2.50K',
    stage: 'Grant',
    fundsAndInvestors: 'New Ventures BC',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '20 Sep 2019',
    moniScore: 14033,
  },
  {
    key: '2',
    name: 'Coinbase',
    slug: 'coinbase',
    logo: 'https://img.cryptorank.io/coins/60x60.flying_tulip1759177295560.png',
    raise: '$500M',
    stage: 'Series E',
    fundsAndInvestors: 'Tiger Global, Andreessen Horowitz',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '14 Oct 2021',
    moniScore: 375,
  },
  {
    key: '3',
    name: 'OpenSea',
    slug: 'opensea',
    logo: 'https://img.cryptorank.io/coins/60x60.flying_tulip1759177295560.png',
    raise: '$100M',
    stage: 'Series B',
    fundsAndInvestors: 'Andreessen Horowitz',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '20 Jul 2021',
    moniScore: 81217,
  },
  {
    key: '4',
    name: 'Binance',
    slug: 'binance',
    logo: 'https://img.cryptorank.io/coins/60x60.figure1757591883065.png',
    raise: '$200M',
    stage: 'Series C',
    fundsAndInvestors: 'Temasek, DST Global',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '10 Mar 2018',
    moniScore: 9125,
  },
  {
    key: '5',
    name: 'Kraken',
    slug: 'kraken',
    logo: 'https://img.cryptorank.io/coins/60x60.figure1757591883065.png',
    raise: '$118M',
    stage: 'Series B',
    fundsAndInvestors: 'Hummingbird Ventures, Blockchain Capital',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '15 May 2016',
    moniScore: 714,
  },
  {
    key: '6',
    name: 'Ripple',
    slug: 'ripple',
    logo: 'https://img.cryptorank.io/coins/60x60.figure1757591883065.png',
    raise: '$93M',
    stage: 'Series C',
    fundsAndInvestors: 'IDG Capital, SBI Holdings',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '01 Dec 2019',
    moniScore: 8121,
  },
  {
    key: '7',
    name: 'Chainalysis',
    slug: 'chainalysis',
    logo: 'https://img.cryptorank.io/coins/60x60.figure1757591883065.png',
    raise: '$170M',
    stage: 'Series F',
    fundsAndInvestors: 'Coatue, Paradigm',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '11 May 2022',
    moniScore: 894,
  },
  {
    key: '8',
    name: 'Circle',
    slug: 'circle',
    logo: 'https://img.cryptorank.io/coins/60x60.clean_spark1666356730934.png',
    raise: '$400M',
    stage: 'Private Equity',
    fundsAndInvestors: 'BlackRock, Fidelity',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '12 Apr 2022',
    moniScore: 1290,
  },
  {
    key: '9',
    name: 'Ledger',
    slug: 'ledger',
    logo: 'https://img.cryptorank.io/coins/60x60.clean_spark1666356730934.png',
    raise: '$380M',
    stage: 'Series C',
    fundsAndInvestors: '10T Holdings, Cathay Innovation',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '10 Jun 2021',
    moniScore: 88984,
  },
  {
    key: '10',
    name: 'BlockFi',
    slug: 'blockfi',
    logo: 'https://img.cryptorank.io/coins/60x60.clean_spark1666356730934.png',
    raise: '$350M',
    stage: 'Series D',
    fundsAndInvestors: 'Bain Capital, Tiger Global',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '11 Mar 2021',
    moniScore: 608,
  },
  {
    key: '11',
    name: 'FTX',
    slug: 'ftx',
    logo: 'https://img.cryptorank.io/coins/60x60.flying_tulip1759177295560.png',
    raise: '$900M',
    stage: 'Series B',
    fundsAndInvestors: 'Sequoia, Paradigm, SoftBank',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '20 Jul 2021',
    moniScore: 3780,
  },
  {
    key: '12',
    name: 'Animoca Brands',
    slug: 'animoca-brands',
    logo: 'https://img.cryptorank.io/coins/60x60.flying_tulip1759177295560.png',
    raise: '$359M',
    stage: 'Venture Round',
    fundsAndInvestors: 'Sequoia China, Liberty City Ventures',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '18 Jan 2022',
    moniScore: 8678,
  },
  {
    key: '13',
    name: 'Animoca Brands',
    slug: 'animoca-brands',
    logo: 'https://img.cryptorank.io/coins/60x60.flying_tulip1759177295560.png',
    raise: '$359M',
    stage: 'Venture Round',
    fundsAndInvestors: 'Sequoia China, Liberty City Ventures',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '18 Jan 2022',
    moniScore: 8786,
  },
  {
    key: '14',
    name: 'Animoca Brands',
    slug: 'animoca-brands',
    logo: 'https://img.cryptorank.io/coins/60x60.flying_tulip1759177295560.png',
    raise: '$359M',
    stage: 'Venture Round',
    fundsAndInvestors: 'Sequoia China, Liberty City Ventures',
    fundLogo:
      'https://img.cryptorank.io/funds/60x60.pantera%20capital1648480190185.png',
    date: '18 Jan 2022',
    moniScore: 87886,
  },
];

const toNumber = (val: string) => {
  if (!val) return 0;
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  if (val.includes('M')) return num * 1_000_000;
  if (val.includes('K')) return num * 1_000;
  return num;
};

const AirdropTable = () => {
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const themeNext = useTheme();
  const locale = useLocale();

  const handleChange = (_: any, __: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  //   const handleChange = (pagination: any, filters: any, sorter: any) => {
  //     console.log('Various parameters', pagination, filters, sorter);
  //     setSortedInfo(sorter);
  //   };

  const columns: ColumnsType<RowData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <Link
          href={`/${locale}/airdrop/${record.slug}`}
          className="flex items-center gap-2"
        >
          <img
            src={record.logo}
            alt={text}
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
          <span className="font-semibold text-black dark:text-white hover:text-blue-500 transition-colors">
            {text}
          </span>
        </Link>
      ),
    },
    {
      title: 'Raise',
      dataIndex: 'raise',
      key: 'raise',
      align: 'right',
      onCell: () => ({
        style: { fontWeight: 600 }, // cell data
      }),
      width: 140,
      sorter: (a, b) => toNumber(a.raise) - toNumber(b.raise),
      sortOrder: sortedInfo.columnKey === 'raise' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      sorter: (a, b) => a.stage.localeCompare(b.stage),
      sortOrder: sortedInfo.columnKey === 'stage' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: 'Funds and Investors',
      dataIndex: 'fundsAndInvestors',
      key: 'fundsAndInvestors',
      sorter: (a, b) => a.fundsAndInvestors.localeCompare(b.fundsAndInvestors),
      sortOrder:
        sortedInfo.columnKey === 'fundsAndInvestors' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={record.fundLogo}
            alt={text}
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: 'Moni Score',
      dataIndex: 'moniScore',
      key: 'moniScore',
      sorter: (a, b) => a.moniScore - b.moniScore,
      sortOrder: sortedInfo.columnKey === 'moniScore' ? sortedInfo.order : null,
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="font-semibold">{text}</span>
          <GradientSlider score={record.moniScore} />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Mobile view */}
      <div className="flex flex-col gap-4 md:hidden">
        {data.map((item) => (
          <Card key={item.key} className="p-4 rounded-md shadow-sm">
            <Link
              href={`/${locale}/airdrop/${item.slug}`}
              className="flex items-center gap-2"
            >
              <img
                src={item.logo}
                alt={item.name}
                style={{ width: 24, height: 24, borderRadius: '50%' }}
              />
              <span className="font-semibold text-black dark:text-white hover:text-blue-500 transition-colors">
                {item.name}
              </span>
            </Link>
            <div className="flex justify-between text-sm mt-2">
              <span>Raise</span>
              <span className="font-semibold">{item.raise}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Stage</span>
              <span className="font-semibold">{item.stage}</span>
            </div>
            <div className="flex justify-between text-sm">
              <GradientSlider score={item.moniScore} />
              <span className="font-semibold">{item.moniScore}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <ConfigProvider
          theme={{
            algorithm:
              themeNext.theme === 'dark'
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
            token: {
              fontSize: 16,
              padding: 20,
            },
          }}
        >
          <AntdTable
            columns={columns}
            dataSource={data}
            onChange={handleChange}
            pagination={{ pageSize: 10 }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AirdropTable;
