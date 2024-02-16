import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdMail, MdPerson, MdPhone } from "react-icons/md";
import user from "../../../assets/img/user.png";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  MenuItem,
  Textarea,
  Typography,
  Button,
} from "@material-tailwind/react";
import HousePostDialog from "../HousePostDialog/HousePostDialog";
import FurniturePostDialog from "../FurniturePostDialog/FurniturePostDialog";
import MediaPostDialog from "../MediaPostDialog/MediaPostDialog";
import { Announcer } from "../../../utils/types";
import useAxios from "../../../utils/useAsios";
import { useParams } from "react-router-dom";

//this component display all user information
export default function UserInfoCard() {
  const [addSomething, setAddSomething] = useState(false);
  const [addMedias, setAddMedias] = useState(false);
  const [addAnnounces, setAddAnnounces] = useState(false);
  const [addFurnitures, setAddFurnitures] = useState(false);
  const [addhouse, setAddHouse] = useState(false);

  const [deleteAnnouncer, setDeleteAnnouncers] = useState(false);

  const { id } = useParams();
  const [announcerInfo, setannouncerInfo] = useState<Announcer | null>(null);
  const axios = useAxios();

  const getannouncerInfo = async () => {
    const response = await axios.get(`/announcers/${id}/`);
    setannouncerInfo(response.data);
  };
  useEffect(() => {
    getannouncerInfo();
  }, []);
  return (
    <div className="flex gap-10 bg-white p-10 items-center  h-96">
      <div
        className="flex flex-col  items-center w-64 h-64 justify-center rounded-full r
         bg-gray-400 overflow-hidden border "
      >
        <img
          src={user}
          className="object-fill min-w-full  min-h-full  bg-red-950"
        />
      </div>
      <div className=" h-full   flex-1 justify-center flex flex-col rounded bg-white  py-4 ">
        <h2 className="font-black text-gray-900 text-5xl">
          {announcerInfo?.name}
        </h2>
        <p className="mt-8 font-light flex-1 ">{announcerInfo?.bio}</p>
        <div>
          <ul className="my-10 leading-7">
            <li className="flex items-center">
              <MdMail className="mr-3" /> {announcerInfo?.email}
            </li>
            <li className="flex items-center">
              <MdPhone className="mr-3" /> {announcerInfo?.contact}
            </li>
            <li></li>
          </ul>
          <div className="flex gap-3">
            <button
              onClick={() => setAddAnnounces(true)}
              className="transition cursor-pointer hover:text-white text-white font-bold py-2 px-4 rounded-lg bg-gray-900 w-44 "
            >
              upload{" "}
            </button>
            <button
              onClick={() => setDeleteAnnouncers(true)}
              className="transition cursor-pointer text-red-800 border-red-700 border-solid font-bold py-2 px-4 rounded-lg bg-white w-44 "
            >
              close
            </button>

            <Dialog
              open={addAnnounces}
              handler={() => setAddAnnounces(false)}
              size="xs"
            >
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
                  <MenuItem
                    className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
                    onClick={() => setAddHouse(true)}
                  >
                    <img
                      src="https://docs.material-tailwind.com/icons/metamask.svg"
                      alt="metamast"
                      className="h-6 w-6"
                    />
                    <Typography
                      className="uppercase"
                      color="blue-gray"
                      variant="h6"
                    >
                      post a house
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md"
                    onClick={() => setAddFurnitures(true)}
                  >
                    <img
                      src="https://docs.material-tailwind.com/icons/coinbase.svg"
                      alt="metamast"
                      className="h-6 w-6 rounded-md"
                    />
                    <Typography
                      className="uppercase"
                      color="blue-gray"
                      variant="h6"
                    >
                      post a furniture
                    </Typography>
                  </MenuItem>

                  <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md">
                    <img
                      src="https://docs.material-tailwind.com/icons/coinbase.svg"
                      alt="metamast"
                      className="h-6 w-6 rounded-md"
                    />
                    <Typography
                      className="uppercase"
                      color="blue-gray"
                      variant="h6"
                    >
                      post a terrain (comming soon)
                    </Typography>
                  </MenuItem>
                </ul>
              </DialogBody>
            </Dialog>

            <HousePostDialog
              open={addhouse}
              handler={() => setAddHouse(false)}
            />
            <FurniturePostDialog
              open={addFurnitures}
              handler={() => setAddFurnitures(false)}
            />
            <MediaPostDialog
              open={addMedias}
              handler={() => setAddMedias(false)}
            />

            <Dialog
              open={deleteAnnouncer}
              handler={() => {
                setDeleteAnnouncers(false);
              }}
              size="xs"
            >
              <DialogHeader>close this account ?</DialogHeader>
              <DialogBody>
                do you really want to close this account this action is
                irreversible
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setDeleteAnnouncers(false)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="black" onClick={() => {}}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
