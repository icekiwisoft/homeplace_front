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
    Typography, Select, Option
} from "@material-tailwind/react"
import React from "react"

export default function MediaPostDialog({ open, handler }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    return (
        <Dialog open={open} handler={handler} size="xs" >
            <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                    <Typography className="" variant="h4">
                        post a media
                    </Typography>
                </DialogHeader>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    className="mr-3 h-5 w-5" onClick={handler}
                >
                    <path fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd" />
                </svg>
            </div>
            <DialogBody className=" overflow-auto">
                <Typography className="mb-5  " color="gray" variant="lead">
                    add media for this announcers
                </Typography>



                <div className="">
                    <div className="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" multiple type="file" className="hidden" />
                        </label>
                    </div>

                    <div className="grid grid-cols-6 mt-4">
                        {
                            [...Array(10)].map((elementInArray, index) => (
                                <div className="overflow-hidden bg-gray-200 aspect-square ">
                                    <img className="bg-gray object-fill  " />
                                </div>
                            ))
                        }

                    </div>
                </div>

            </DialogBody>
            <DialogFooter className="space-x-2">

                <Button variant="text" color="gray" onClick={handler}>
                    cancel
                </Button>
                <Button onClick={handleNext} >
                    post
                </Button>

            </DialogFooter>
        </Dialog>
    )
}