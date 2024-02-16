import React, { useEffect, useState } from "react";
import { Ad } from "../../../utils/types";
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
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import useAxios from "../../../utils/useAsios";
import dayjs from "dayjs";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "furniture",
    value: "furniture",
  },
  {
    label: "house",
    value: "house",
  },
];

const TABLE_HEAD = ["ads", "category", "type", "created at ", ""];

export default function AdsTable() {
  const [adsPage, setAdsPage] = useState<Ad[][]>([]);
  const [currentAds, setCurrentAds] = useState<Ad[]>([]);

  const [deleteAd, setDeleteAd] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const axios = useAxios();
  const removeAd = async (id: string) => {
    await axios.delete(`/ads/${id}`);
  };
  const getCurrentAds = async () => {
    if (adsPage.length < page + 1) {
      const response = await axios.get("/ads", {
        params: {
          page: page,
        },
      });

      setAdsPage([...adsPage, response.data.data]);
      setCurrentAds([...response.data.data]);
    } else {
      setCurrentAds(adsPage[page]);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    getCurrentAds();
  }, [page, adsPage]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              ads list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about ads
            </Typography>
          </div>
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
            {currentAds.map(
              (
                {
                  ad_type,
                  medias,
                  description,
                  price,
                  creation_date,
                  id,
                  category,
                },
                index
              ) => {
                const isLast = index === currentAds.length - 1;
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
                            {description}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {price} frcfa
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        {category ? (
                          <>
                            {" "}
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {category.name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {category.type}
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            non specifié
                          </Typography>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={ad_type ? "sale" : "location"}
                          color={ad_type ? "green" : "blue-gray"}
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
                            onClick={() => setDeleteAd(id)}
                            variant="text"
                          >
                            <TrashIcon className="h-4 w-4" />
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

      <Dialog
        open={deleteAd ? true : false}
        handler={() => setDeleteAd(null)}
        size="xs"
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="" variant="h4">
              delete this ad
            </Typography>
          </DialogHeader>
        </div>
        <DialogBody className=" overflow-auto">
          <Typography className="mb-5  " color="gray" variant="lead">
            whant to delete this ads ?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button onClick={() => removeAd(deleteAd!)}>delete</Button>

          <Button
            variant="text"
            color="gray"
            onClick={() => removeAd(deleteAd!)}
          >
            cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
