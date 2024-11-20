import {
  ChevronUpDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  MenuItem,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { Category } from '../../../utils/types';
import useAxios from '../../../utils/useAsios';
import CategoryPostDialog from '../CategoryPostDialog/CategoryPostDialog';

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'furniture',
    value: 'furniture',
  },
  {
    label: 'house',
    value: 'house',
  },
];

const TABLE_HEAD = ['categories', 'items', 'type', 'created at ', ''];

export default function CategoriesTable() {
  const [categoriesPage, setCategoriesPage] = useState<Category[][]>([]);
  const [currentCategories, setCurrentCategories] = useState<Category[]>([]);
  const [createCategory, setCreateCategory] = useState(false);
  const [createFurnitureCategory, setCreateFurnitureCategory] = useState(false);
  const [createHouseCategory, setCreateHouseCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const axios = useAxios();

  const getCurrentCategories = async () => {
    if (categoriesPage.length < page + 1) {
      const response = await axios.get('/categories', {
        params: {
          page: page,
        },
      });

      setCategoriesPage([...categoriesPage, response.data.data]);
      setCurrentCategories([...response.data.data]);
    } else {
      setCurrentCategories(categoriesPage[page]);
    }
  };

  const removeCategory = async (id: string) => {
    await axios.delete(`/categories/${id}`);
    setDeleteCategory(null);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    getCurrentCategories();
  }, [page, categoriesPage]);

  return (
    <Card className='h-full w-full'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              categories list
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              See information about categories
            </Typography>
          </div>
          <Button
            title='create a category'
            onClick={() => setCreateCategory(true)}
          >
            create
          </Button>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <Tabs value='all' className='w-full md:w-max'>
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className='w-full md:w-72'>
            <Input
              label='Search'
              icon={<MagnifyingGlassIcon className='h-5 w-5' />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className='overflow-scroll flex-1 px-0'>
        <table className='mt-4 w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
                  >
                    {head}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className='h-4 w-4' />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentCategories.map(
              ({ name, type, items, id, creation_date }, index) => {
                const isLast = index === currentCategories.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {items}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='w-max'>
                        <Chip
                          variant='ghost'
                          size='sm'
                          value={type ? 'furniture' : 'house'}
                          color={type ? 'green' : 'blue-gray'}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {dayjs(creation_date).format('DD/MM/YY')}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='flex'>
                        <Tooltip content='Edit User'>
                          <IconButton variant='text'>
                            <PencilIcon className='h-4 w-4' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content='delete User'>
                          <IconButton
                            color='red'
                            variant='text'
                            onClick={() => setDeleteCategory(id)}
                          >
                            <TrashIcon className='h-4 w-4' />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page {page} of 10
        </Typography>
        <div className='flex gap-2'>
          <Button variant='outlined' onClick={previousPage} size='sm'>
            Previous
          </Button>
          <Button variant='outlined' onClick={nextPage} size='sm'>
            Next
          </Button>
        </div>
      </CardFooter>

      <Dialog
        open={createCategory}
        handler={() => setCreateCategory(false)}
        size='xs'
      >
        <DialogHeader>
          <div>
            <Typography variant='h5' color='blue-gray'>
              what type of ad
            </Typography>
            <Typography color='gray' variant='paragraph'>
              you can choose either furniture , house
            </Typography>
          </div>
        </DialogHeader>
        <DialogBody>
          <ul className='mt-3 -ml-2 flex flex-col gap-1'>
            <MenuItem
              className='mb-1 flex items-center justify-center gap-3 !py-4 shadow-md'
              onClick={() => setCreateFurnitureCategory(true)}
            >
              <Typography className='uppercase' color='blue-gray' variant='h6'>
                furniture category
              </Typography>
            </MenuItem>

            <MenuItem
              className='mb-1 flex items-center justify-center text-gray-900  gap-3 !py-4 shadow-md'
              onClick={() => setCreateHouseCategory(true)}
            >
              <HomeIcon className='h-7' />
              <Typography className='uppercase' color='blue-gray' variant='h6'>
                house category
              </Typography>
            </MenuItem>
          </ul>
        </DialogBody>
      </Dialog>
      <CategoryPostDialog
        open={createFurnitureCategory || createHouseCategory}
        handler={() => {
          if (createFurnitureCategory) setCreateFurnitureCategory(false);
          else if (createHouseCategory) setCreateHouseCategory(false);
        }}
        type={createFurnitureCategory ? 1 : createHouseCategory && 0}
      />

      <Dialog
        open={deleteCategory ? true : false}
        handler={() => setDeleteCategory(null)}
        size='xs'
      >
        <div className='flex items-center justify-between'>
          <DialogHeader className='flex flex-col items-start'>
            <Typography className='' variant='h4'>
              delete this category
            </Typography>
          </DialogHeader>
        </div>
        <DialogBody className=' overflow-auto'>
          <Typography className='mb-5  ' color='gray' variant='lead'>
            whant to delete this category ?
          </Typography>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button onClick={() => removeCategory(deleteCategory!)}>
            delete
          </Button>

          <Button
            variant='text'
            color='gray'
            onClick={() => setDeleteCategory(null)}
          >
            cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
