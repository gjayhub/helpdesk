import React, { useState, useEffect, useRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Send, Trash2, SquarePen } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import moment from "moment";
import { sendReply, updateStatus } from "@/lib/action";
import "moment-timezone";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Progress from "./Progress";
import { useProfileStore } from "@/lib/store/profile";
import SubmitButton from "./ui/SubmitButton";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const SingleTicket = ({
  selected,
  setSelected,
  profile,
  setTickets,
  tickets,
}) => {
  const sendReplyTicket = sendReply.bind(null, selected.ticket_id);
  const supabase = createClient();
  const { toast } = useToast();
  const responseRef = useRef(null);
  const [progress, setProgress] = useState();
  const [remark, setRemark] = useState(null);
  useEffect(() => {
    setProgress(selected.progress);
  }, [selected]);

  useEffect(() => {
    const channels = supabase
      .channel("realtime_replies")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "responses" },
        async (payload) => {
          const { data, error } = await supabase
            .from("tickets")
            .update({ is_updated: true })
            .eq("ticket_id", selected.ticket_id)
            .select();
          const index = tickets.findIndex(
            (item) => item.ticket_id === selected.ticket_id
          );

          if (index !== -1) {
            const updatedData = [...tickets]; // Create a copy of the data array
            updatedData[index].responses.push(payload.new); // Push the new response to the responses array of the item
            setTickets(updatedData); // Update the state with the modified data array
            setSelected(updatedData[index]);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase, selected, tickets, setTickets, setSelected]);

  const form =
    useForm <
    z.infer <
    typeof FormSchema >>
      {
        resolver: zodResolver(FormSchema),
      };
  const handleDelete = async (ticket_id) => {
    const { data, error } = await supabase
      .from("tickets")
      .delete()
      .eq("ticket_id", ticket_id);
    const newTickets = tickets.filter(
      (ticket) => ticket.ticket_id !== ticket_id
    );
    setTickets(newTickets);
    setSelected();
    // if (error) {
    //   // Handle error here
    //   console.error("Error deleting ticket:", error.message);
    //   toast({
    //     variant: "error",
    //     title: "Failed to delete ticket",
    //     description: error.message,
    //   });
    //   return;
    // }

    // router.refresh();
    // Update state only if deletion was successful

    toast({
      variant: "success",
      title: "Ticket deleted successfully",
    });
  };

  const handleUpdate = async () => {
    let status;
    if (progress == 0) status = "new";
    if (progress > 0 && progress < 100) status = "ongoing";
    if (progress == 100) status = "resolved";

    try {
      const { data, error } = await supabase
        .from("tickets")
        .update({ progress, status, is_updated: true, remark })
        .eq("ticket_id", selected.ticket_id)
        .select();

      setTickets((prev) => {
        const index = prev.findIndex(
          (item) => item.ticket_id === selected.ticket_id
        );
        if (index !== -1) {
          const updatedData = [...new Set(prev)]; // Create a copy of the array
          updatedData[index] = { ...updatedData[index], progress, status }; // Update the item
          setSelected(updatedData[index]);

          return updatedData; // Return the updated array
        }

        return updatedData;
      });
      toast({
        variant: "success",
        title: "Updated succesfully",
        description: `Ticket progress is updated to ${progress}%`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validateUpdate = () => {
    if (progress > 0 && progress < 100) {
      return (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you want to update the progress to {progress} sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Progress will be updated to {progress} and status will be set to
              <span className="font-bold"> ongoing</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <span className="cursor-pointer" onClick={() => handleUpdate()}>
                Continue
              </span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      );
    }
    if (progress == 100) {
      return (
        <>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you want to update the progress to {progress} sure?
            </AlertDialogTitle>

            <div>
              Progress will be updated to {progress} and status will be set to{" "}
              <span className="font-bold">resolved</span>
            </div>

            <form action="">
              <RadioGroup onValueChange={(e) => setRemark(e)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no response" id="r1" />
                  <Label htmlFor="r1">No response from sender</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="resolved" id="r2" />
                  <Label htmlFor="r2">Resolved properly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="r3" />
                  <Label htmlFor="r3">Other</Label>
                </div>
              </RadioGroup>
              {!(
                remark === "no response" ||
                remark === "resolved" ||
                remark === null
              ) && (
                <div>
                  <p>Specify</p>
                  <Input
                    placeholder="other reasons..."
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </div>
              )}
            </form>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button disabled={remark === null} onClick={() => handleUpdate()}>
                <span className="cursor-pointer">Continue</span>
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </>
      );
    }
    return (
      <>
        <AlertDialogTitle>
          <p className="text-red-500">Cant revert back to 0%!</p>
        </AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Okay</AlertDialogCancel>
        </AlertDialogFooter>
      </>
    );
  };

  return (
    <>
      {!selected ? (
        <div className="flex justify-center items-center">
          <p>No ticket selected</p>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          {profile.role === "user" ? (
            <div className="flex justify-around h-[52px] items-center  gap-6 px-10">
              <p className="p-0 m-0 font-semibold text-sm text-nowrap  ">
                {selected.status}
              </p>

              <Progress progress={progress} />
            </div>
          ) : (
            <div className="flex  justify-center  gap-3 px-4 py-3.5">
              <Tooltip>
                <TooltipTrigger
                  onClick={() => handleDelete(selected.ticket_id)}
                >
                  <Trash2 />
                </TooltipTrigger>{" "}
                <TooltipContent>
                  <p>Delete ticket</p>
                </TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" />

              <div className="flex items-center justify-around [&_input]: w-full">
                <p className="p-0 m-0 font-semibold text-sm text-nowrap capitalize">
                  {selected.category}
                </p>
                <p className="p-0 m-0 font-semibold text-sm text-nowrap capitalize">
                  {selected.status}
                </p>

                <Tooltip>
                  <TooltipTrigger>
                    <input
                      value={progress || 0}
                      name="progress"
                      type="range"
                      min={0}
                      max={100}
                      onChange={(e) => setProgress(e.target.value)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Status</span>
                  </TooltipContent>
                </Tooltip>
              </div>

              <Separator orientation="vertical" />
              <AlertDialog>
                <AlertDialogTrigger>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SquarePen className="h-5" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Update ticket</p>
                    </TooltipContent>
                  </Tooltip>
                </AlertDialogTrigger>
                <AlertDialogContent>{validateUpdate()}</AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          <Separator />

          <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <Avatar>
                  <AvatarImage alt="Namae" />
                  <AvatarFallback>
                    {selected.profiles.full_name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">
                    {selected.profiles.full_name}
                  </div>
                  <div className="line-clamp-1 text-xs">{selected.title}</div>
                  <div className="line-clamp-1 text-xs">
                    <span className="font-medium">Reply-To:</span>{" "}
                    {selected.profiles.email}
                  </div>
                </div>
              </div>

              <div className="ml-auto text-xs text-muted-foreground">
                {moment(selected.created_at).calendar()}
              </div>
            </div>
            <Separator />
            <div className="flex-1  p-4 text-sm">{selected.description}</div>
            <Separator />

            <div className="p-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Replies</AccordionTrigger>
                  <AccordionContent>
                    <ScrollArea className="h-60 relative flex ">
                      {selected.responses.map((response) => {
                        return (
                          <div
                            key={response.id}
                            className="bg-slate-100 mr-20 p-2 w-full rounded-sm mb-5"
                          >
                            <p className="font-semibold ">
                              {profile.full_name === response.sender_name
                                ? "You"
                                : response.sender_name}
                            </p>

                            <p className="py-1">{response.response_text}</p>
                            <p className="text-xs text-slate-400">
                              {moment(response.created_at).calendar()}
                            </p>
                          </div>
                        );
                      })}
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <form
                ref={responseRef}
                action={async (formData) => {
                  await sendReplyTicket(formData);
                  responseRef.current.reset();
                }}
              >
                <div className="grid gap-4">
                  <Textarea
                    name="reply"
                    className="p-4"
                    placeholder={`Reply ${selected.profiles.full_name}...`}
                  />
                  <div className="flex items-center">
                    <SubmitButton text="Send" customStyle="ml-auto" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTicket;
