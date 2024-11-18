import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "pending",
    label: "En attente",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "processing",
    label: "Traitement",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "En cours",
    icon: StopwatchIcon,
  },
  {
    value: "completed",
    label: "Terminé",
    icon: CheckCircledIcon,
  },
  {
    value: "rejected",
    label: "Rejeté",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
