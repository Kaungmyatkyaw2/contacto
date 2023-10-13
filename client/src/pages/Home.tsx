import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AuthContext } from "@/context/provider/AuthContextProvider"
import axiosClient from "@/lib/axiosClient"
import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "P  fgfgending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export const Home = () => {

  const { state: auth } = useContext(AuthContext);

  const fetchSmth = async () => {
    console.log(auth?.token)
    const response = await axiosClient.get("/contacts")

    console.log(response.data)
  }

  useEffect(() => {
    fetchSmth()
  }, [])

  return (
    <>
      <>

        <Table>
          <TableHeader className="sticky top-0 left-0 bg-white w-full ">
            <TableRow className="hover:bg-white">
              <TableHead className="w-[30%] text-[16px] font-bold">Name</TableHead>
              <TableHead className="w-[30%] text-[16px] font-bold">Email</TableHead>
              <TableHead className="w-[30%] text-[16px] font-bold">Phone number</TableHead>
              <TableHead className="w-[10%] text-[16px] font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="space-y-[200px]">
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className="border-none cursor-pointer">
                <TableCell className="font-medium py-[20px]">{invoice.invoice}</TableCell>
                <TableCell className="font-medium py-[20px]">{invoice.paymentStatus}</TableCell>
                <TableCell className="font-medium py-[20px]">{invoice.paymentMethod}</TableCell>
                <TableCell className="font-medium py-[20px]"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </>
    </>
  )
}

