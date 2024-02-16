import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../../assets/img/user.png";
import { Announcer } from "../../../utils/types";
import {
  Avatar,
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
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronUpDownIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import useAxios from "../../../utils/useAsios";
import dayjs from "dayjs";
import AnnouncerPostDialog from "../AnnouncerPostDialog/AnnouncerPostDialog";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "verified",
    value: "verified",
  },
  {
    label: "Unverified",
    value: "unverified",
  },
];

const TABLE_HEAD = ["announcer", "ads", "status", "creation", ""];

export default function AnnouncersTable() {
  const [announcersPage, setAnnouncersPage] = useState<Announcer[][]>([]);
  const [currentAnnouncers, setCurrentAnnouncers] = useState<Announcer[]>([]);
  const [createAnnouncer, setCreateAnnouncer] = useState(false);
  const [deleteAnnouncer, setDeleteAnnouncer] = useState<string | null>(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const axios = useAxios();

  const removeAnnouncer = async (id: string) => {
    await axios.delete(`/announcers/${id}`);
  };
  const getCurrentAnnouncers = async () => {
    if (announcersPage.length < page + 1) {
      const response = await axios.get("/announcers", {
        params: {
          page: page,
        },
      });

      setAnnouncersPage([...announcersPage, response.data.data]);
      setCurrentAnnouncers([...response.data.data]);
    } else {
      setCurrentAnnouncers(announcersPage[page]);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    getCurrentAnnouncers();
  }, [page, announcersPage]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              announcers list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about announcers
            </Typography>
          </div>

          <Button
            title="create an announcer"
            onClick={() => setCreateAnnouncer(true)}
          >
            create{" "}
          </Button>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll flex-1 px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentAnnouncers.map(
              ({ name, verified, creation_date, id }, index) => {
                const isLast = index === currentAnnouncers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {60}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={verified ? "verified" : "unverified"}
                          color={verified ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {dayjs(creation_date).format("DD/MM/YY")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex">
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="delete User">
                          <IconButton
                            color="red"
                            variant="text"
                            onClick={() => setDeleteAnnouncer(id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="view announcer">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              navigate(`/dashboard/announcers/${id}`)
                            }
                          >
                            <EyeIcon className="h-4 w-4" />
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {page} of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" onClick={previousPage} size="sm">
            Previous
          </Button>
          <Button variant="outlined" onClick={nextPage} size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      <AnnouncerPostDialog
        open={createAnnouncer}
        handler={() => setCreateAnnouncer(false)}
      />

      <Dialog
        open={deleteAnnouncer ? true : false}
        handler={() => setDeleteAnnouncer(null)}
        size="xs"
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="" variant="h4">
              delete this announcer
            </Typography>
          </DialogHeader>
        </div>
        <DialogBody className=" overflow-auto">
          <Typography className="mb-5  " color="gray" variant="lead">
            add media for this announcers
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button onClick={() => removeAnnouncer(deleteAnnouncer!)}>
            delete
          </Button>

          <Button
            variant="text"
            color="gray"
            onClick={() => removeAnnouncer(deleteAnnouncer!)}
          >
            cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
