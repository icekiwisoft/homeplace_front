import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
  Input,
} from '@material-tailwind/react';
import { useState } from 'react';

import useAxios from '../../../utils/useAsios';

export default function CategoryPostDialog(props: any) {
  const { handler, type } = props;
  const [name, setName] = useState('');
  const [isCreation, setIsCreating] = useState(false);
  console.log(type);
  const axios = useAxios();
  const createcategory = async () => {
    setIsCreating(true);
    await axios.post('/categories', {
      name: name,
      type: type,
    });
    setIsCreating(false);
    handler();
  };

  return (
    <Dialog {...props} size='xs'>
      <div className='flex items-center justify-between'>
        <DialogHeader className='flex flex-col items-start'>
          <Typography className='' variant='h4'>
            create a category
          </Typography>
        </DialogHeader>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='mr-3 h-5 w-5'
          onClick={handler}
        >
          <path
            fillRule='evenodd'
            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <DialogBody className=' overflow-auto'>
        <div className='flex gap-3 flex-col'>
          <Input
            label='name'
            size='lg'
            required
            value={name}
            onChange={e => {
              setName(e.currentTarget.value);
            }}
          />
        </div>
      </DialogBody>
      <DialogFooter className='space-x-2'>
        <Button variant='text' color='gray' onClick={handler}>
          cancel
        </Button>
        <Button onClick={createcategory}>create</Button>
      </DialogFooter>
    </Dialog>
  );
}
