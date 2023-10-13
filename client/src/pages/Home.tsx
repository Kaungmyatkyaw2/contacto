import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axiosClient from "@/lib/axiosClient"
import {  DeleteIcon, Pen } from "lucide-react"
import {  useEffect, useState } from "react"

interface ContactType {
  email?: string | undefined
  name: string
  phoneNumber: string
  _id: string
  photo?: string
  bgColor: string
}

export const Home = () => {

  const [contacts, setContacts] = useState<ContactType[]>([]);

  const fetchSmth = async () => {
    const response = await axiosClient.get("/contacts")

    setContacts(response.data.data.data)
  }


  useEffect(() => {
    fetchSmth()
  }, [])

  return (

    <div className="lg:px-0 px-[30px]">

      <Table>
        <TableHeader className="sticky top-0 left-0 bg-white w-full ">
          <TableRow className="hover:bg-white">
            <TableHead className="w-[30%] text-[16px] font-bold">Name</TableHead>
            <TableHead className="w-[30%] text-[16px] font-bold md:table-cell hidden">Email</TableHead>
            <TableHead className="w-[30%] text-[16px] font-bold sm:table-cell hidden">Phone number</TableHead>
            <TableHead className="w-[10%] text-[16px] font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-[200px]">
          {contacts?.map((contact) => (
            <TableRow key={contact._id} className="border-none cursor-pointer">
              <TableCell className="font-medium py-[20px]">
                <div className="flex items-center space-x-[10px]">
                  <Avatar>
                    {contact.photo && <AvatarImage src={contact.photo} alt="@shadcn" />}
                    <AvatarFallback className={`bg-[${contact.bgColor}]`}>{contact.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{contact.name}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium py-[20px] md:table-cell hidden">{contact.email || ""}</TableCell>
              <TableCell className="font-medium py-[20px] sm:table-cell hidden">{contact.phoneNumber}</TableCell>
              <TableCell className="font-medium py-[20px]">
                <div className="flex items-center space-x-[15px]">
                  <Pen size={17} />
                  <DeleteIcon size={17} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  )
}

