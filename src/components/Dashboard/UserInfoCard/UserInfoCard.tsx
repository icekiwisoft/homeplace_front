import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdMail, MdPerson, MdPhone } from "react-icons/md";
import user from '../../../assets/img/user.png';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Input, MenuItem, Textarea, Typography ,Button} from
    "@material-tailwind/react";
import HousePostDialog from "../HousePostDialog/HousePostDialog";
import FurniturePostDialog from "../FurniturePostDialog/FurniturePostDialog";
import MediaPostDialog from "../MediaPostDialog/MediaPostDialog";



//this component display all user information 
export default function UserInfoCard() {
    const [addSomething, setAddSomething] = useState(false)
    const [addMedias, setAddMedias] = useState(false)
    const [addAnnounces, setAddAnnounces] = useState(false)
    const [addFurnitures, setAddFurnitures] = useState(false)
    const [addhouse, setAddHouse] = useState(false)

    const [deleteAnnouncer, setDeleteAnnouncers] = useState(false)
    return (

        <div className="flex gap-10 h-96">

            <div className="flex flex-col items-center flex-1 justify-center h-full rounded bg-gray-100 border shadow-md p-4 ">
                <img src={user} className="aspect-square  h-[300px] rounded-full bg-red-950" />
            </div>
            <div className=" h-full  flex-1 justify-center  py-9 rounded bg-gray-100 border shadow-md p-4 ">
                <h2 className="font-bold text-gray-900">monjos</h2>
                <p className="mt-8 font-light ">jeux de damme en pagaille jeux de damme en pagaillejeux de damme en pagaille</p>
                <div>
                    <ul className="my-10">
                        <li className="flex items-center">
                            <MdMail className="mr-3" /> ngdream1953@gmail.com
                        </li>
                        <li className="flex items-center">
                            <MdPhone className="mr-3" /> +237 672 00 59 34
                        </li>
                        <li></li>
                    </ul>
                    <div className="flex gap-3">
                        <button onClick={() => setAddSomething(true)}
                            className="transition cursor-pointer hover:text-white text-white font-bold py-2 px-4 rounded-lg bg-gray-900 w-36 ">
                            upload </button>
                        <button
                            onClick={() => setDeleteAnnouncers(true)}
                            className="transition cursor-pointer text-red-800 border-red-700 border-solid font-bold py-2 px-4 rounded-lg bg-white w-36 ">
                            close</button>
                        <Dialog open={addSomething} handler={() => setAddSomething(false)} size="xs">
                            <DialogHeader>
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                        post somthing for this announcers
                                    </Typography>
                                    <Typography color="gray" variant="paragraph">
                                        you can choose to post either ads or medias for this announcer
                                    </Typography>
                                </div>
                            </DialogHeader>
                            <DialogBody>

                                <ul className="mt-3 -ml-2 flex flex-col gap-1">
                                    <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
                                        onClick={() => setAddAnnounces(true)} >
                                        <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="metamast"
                                            className="h-6 w-6" />
                                        <Typography className="uppercase" color="blue-gray" variant="h6">
                                            post an ad
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md"
                                        onClick={() => setAddMedias(true)}>
                                        <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="metamast"
                                            className="h-6 w-6 rounded-md" />
                                        <Typography className="uppercase" color="blue-gray" variant="h6">
                                            post a media
                                        </Typography>
                                    </MenuItem>
                                </ul>
                            </DialogBody>
                        </Dialog>
                        <Dialog open={addAnnounces} handler={() => setAddAnnounces(false)} size="xs">
                            <DialogHeader>
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                        what type of ad
                                    </Typography>
                                    <Typography color="gray" variant="paragraph">
                                        you can choose either furniture , house
                                    </Typography>
                                </div>
                            </DialogHeader>
                            <DialogBody>

                                <ul className="mt-3 -ml-2 flex flex-col gap-1">
                                    <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
                                        onClick={() => setAddHouse(true)}>
                                        <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="metamast"
                                            className="h-6 w-6" />
                                        <Typography className="uppercase" color="blue-gray" variant="h6">
                                            post a house
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md"
                                        onClick={() => setAddFurnitures(true)}>
                                        <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="metamast"
                                            className="h-6 w-6 rounded-md" />
                                        <Typography className="uppercase" color="blue-gray" variant="h6">
                                            post a furniture
                                        </Typography>
                                    </MenuItem>

                                    <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md">
                                        <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="metamast"
                                            className="h-6 w-6 rounded-md" />
                                        <Typography className="uppercase" color="blue-gray" variant="h6">
                                            post a terrain (comming soon)
                                        </Typography>
                                    </MenuItem>
                                </ul>
                            </DialogBody>
                        </Dialog>

                        <HousePostDialog open={addhouse} handler={() => setAddHouse(false)} />
                        <FurniturePostDialog open={addFurnitures} handler={() => setAddFurnitures(false)} />
                        <MediaPostDialog open={addMedias} handler={() => setAddMedias(false)} />
  
                        <Dialog open={deleteAnnouncer} handler={()=>{setDeleteAnnouncers(false)}} size="xs">
                            <DialogHeader>close this account ?</DialogHeader>
                            <DialogBody>
                               do you really want to close this account this action is irreversible
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={()=>setDeleteAnnouncers(false)}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="gradient" color="black" onClick={()=>{}}>
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>

                    </div>
                </div>
            </div>
        </div>


    )
}
