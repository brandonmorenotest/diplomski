import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { BsEye, BsPostcardHeart } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { formatNumber } from "../utils";
const icons = {
  user: FaUsersCog,
  view: BsEye,
  post: BsPostcardHeart,
  users: FaUsers,
};

export const Stats = ({ dt }) => {
  const data = [
    {
      title: "TOTAL POST",
      icon: "post",
      value: formatNumber(dt?.totalPosts ?? 0),
      diff: 34,
    },

    {
      title: "TOTAL VIEWS",
      icon: "view",
      value: formatNumber(dt?.totalViews ?? 0),
      diff: 18,
    },

  ];

  const stats = data?.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p='md' radius='md' key={stat.title}>
        <Group justify='space-between'>
          <Text className={"capitalize text-sm "}>{stat.title}</Text>
          <Icon className={""} size='1.4rem' stroke={1.5} />
        </Group>

        <Group align='flex-end' gap='xs' mt={25}>
          <Text className={"text-2xl 2xl:text-4xl font-semibold "}>
            {stat.value}
          </Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz='sm'
            fw={500}
            className={"font-medium"}
          >
            <span>{stat?.diff}%</span>
            <DiffIcon size='1rem' stroke={1.5} />
          </Text>
        </Group>

        <Text fz='xs' c='dimmed' mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>;
};
