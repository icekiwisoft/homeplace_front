import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Radio,
  Step,
  Stepper,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import React from 'react';

export default function HousePostDialog({ open, handler }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep(cur => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep(cur => cur - 1);

  return (
    <Dialog open={open} handler={handler} size='xs'>
      <div className='flex items-center justify-between'>
        <DialogHeader className='flex flex-col items-start'>
          <Typography className='mb-1' variant='h4'>
            post a new house
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
      <DialogBody>
        <Typography className='mb-10 -mt-7 ' color='gray' variant='lead'>
          add information about your house.
        </Typography>

        <Stepper
          activeStep={activeStep}
          isLastStep={value => setIsLastStep(value)}
          isFirstStep={value => setIsFirstStep(value)}
        >
          <Step className='cursor-pointer' onClick={() => setActiveStep(0)}>
            1
          </Step>
          <Step className='cursor-pointer' onClick={() => setActiveStep(1)}>
            2
          </Step>
          <Step className='cursor-pointer' onClick={() => setActiveStep(2)}>
            3
          </Step>
        </Stepper>

        <div className='mt-4 min-h-[300px]'>
          {activeStep === 0 && (
            <>
              <div className='grid gap-6'>
                <Input label='libelle' size='lg' />
                <Select label='Select Version'>
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>

                <div className='flex gap-10'>
                  <Radio name='type' label='location' />
                  <Radio name='type' label='vente' defaultChecked />
                </div>
              </div>
            </>
          )}
          {activeStep === 1 && (
            <div className='grid gap-6'>
              <Input label='Pallor' size='lg' type='number' />
              <Input label='Pallor' size='lg' type='number' />
              <Input label='Pallor' size='lg' type='number' />
              <Input label='Pallor' size='lg' type='number' />
            </div>
          )}

          {activeStep === 2 && (
            <>
              <Typography className='text-gray-600 mb-5'>
                add at least 5 media
              </Typography>
              <div className='grid grid-cols-6 '>
                {[...Array(10)].map((elementInArray, index) => (
                  <div className='overflow-hidden bg-gray-200 aspect-square '>
                    <img className='bg-gray object-fill  ' />
                  </div>
                ))}

                <div className='flex items-center justify-center rounded bg-gray-200'>
                  <p className='text-2xl text-gray-800 dark:text-gray-500'>
                    <svg
                      className='w-3.5 h-3.5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 18 18'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 1v16M1 9h16'
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogBody>
      <DialogFooter className='space-x-2'>
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext}>{isLastStep ? 'post' : 'next'}</Button>
      </DialogFooter>
    </Dialog>
  );
}
