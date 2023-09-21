import { DeleteIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    IconButton,
    Input,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { Comment } from "../interface/Comment";
import { User } from "../interface/User";
import { formatTimeSubmitted } from "../utils/formatTimeSubmitted";
import { Resource } from "../interface/Resource";
import { useState } from "react";

interface CommentSectionProps {
    resource: Resource;
    comments: Comment[];
    activeUser: User;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export function CommentSection({
    resource,
    comments,
    activeUser,
    setComments,
}: CommentSectionProps): JSX.Element {
    const [commentInput, setCommentInput] = useState<string>("");

    const releventComments = comments
        .filter((c) => c.resource_id === resource.resource_id)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));

    const recentFiveComments = releventComments.slice(-5);

    async function handleSubmitComment(resource_id: number, user_id: number) {
        await axios.post(baseUrl + "/comments", {
            resource_id: resource_id,
            user_id: user_id,
            text: commentInput,
        });
        setCommentInput("");
    }

    async function handleDeleteComment(comment_id: number) {
        await axios.delete(baseUrl + `/comments/${comment_id}`);
        const updatedComments = comments.filter(
            (c) => c.comment_id !== comment_id
        );
        setComments(updatedComments);
    }

    return (
        <>
            <Accordion w={"100%"} mt={"1rem"} allowToggle>
                <AccordionItem justifyContent={"center"}>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                            Comments
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel>
                        {recentFiveComments.map((comment) => (
                            <Card
                                key={comment.comment_id}
                                textAlign={"center"}
                                mb={4}
                            >
                                <CardHeader
                                    display="flex"
                                    alignItems="center"
                                    pb={0}
                                    pt={1.5}
                                    pr={0.5}
                                >
                                    <Avatar
                                        size={"sm"}
                                        name={comment.name}
                                        src={`./${comment.name}-avatar.png`}
                                        mr={"2"}
                                    />
                                    <Text as={"b"}>{comment.name}</Text>
                                    {activeUser.user_id === comment.user_id && (
                                        <IconButton
                                            onClick={() => {
                                                handleDeleteComment(
                                                    comment.comment_id
                                                );
                                            }}
                                            variant={"ghost"}
                                            ml={"auto"}
                                            mr={"0.5"}
                                            size={"sm"}
                                            aria-label="Delete comment"
                                            icon={<DeleteIcon />}
                                        />
                                    )}
                                </CardHeader>
                                <Text
                                    textAlign={"left"}
                                    paddingInline={"1vw"}
                                    mt={2}
                                >
                                    {comment.text}{" "}
                                </Text>
                                <Text
                                    fontSize={"xs"}
                                    as={"i"}
                                    ml={"auto"}
                                    mr={2}
                                >
                                    {`${formatTimeSubmitted(
                                        comment.created_at
                                    )} `}{" "}
                                </Text>{" "}
                            </Card>
                        ))}

                        <Text
                            fontSize={"sm"}
                        >{`Commenting as ${activeUser.name}`}</Text>
                        <Input
                            placeholder="Enter a commment..."
                            onChange={(e) => setCommentInput(e.target.value)}
                            value={commentInput}
                            mb={4}
                        ></Input>
                        <Button
                            onClick={() =>
                                handleSubmitComment(
                                    resource.resource_id,
                                    activeUser.user_id
                                )
                            }
                        >
                            Submit
                        </Button>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    );
}
