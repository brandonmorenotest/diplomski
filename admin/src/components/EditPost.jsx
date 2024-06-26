import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  useMantineColorScheme,
  TextInput,
  Select,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconColorPicker } from "@tabler/icons-react";
import { BiImages } from "react-icons/bi";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toaster, toast } from "sonner";
import { useUpdatePost } from "../hooks/post-hook";
import useCommentStore from "../store/comments";
import useStore from "../store/store";
import Loading from "./Loading";
import {  uploadFile } from "../utils";
import { fetchCategories } from '../hooks/category-hook'; 

const EditPost = ({ opened, close }) => {
  const { colorScheme } = useMantineColorScheme();

  const { user } = useStore();
  const { post } = useCommentStore();
  const isMobile = useMediaQuery("(max-width: 50em)");

  const { isPending, mutate, isSuccess } = useUpdatePost(toast, user?.token);

  const theme = colorScheme === "dark";
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.cat)
  const [file, setFile] = useState("")
  const [fileURL, setFileURL] = useState(post.img);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);



  const options = {
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write article here...." }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  };

  let editor = useEditor({
    ...options,
    content: post.desc,
  });

  useEffect(() => {
    file && uploadFile(setFileURL, file);
  }, [file]);
  
  const handleSubmit = async () => {
    if (!title || !category || !editor.getHTML()) {
      toast.error("All fields are required.");
      return;
    }
  
    try {
      const updatedPost = {
        id: post._id,
        title,
        cat: category,
        img: fileURL || post.img, // Use the updated file URL if available, otherwise use the existing image URL
        desc: editor.getHTML(),
      };
  
      await mutate(updatedPost);
  
      if (isSuccess) {
        close();
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel any pending requests if component unmounts
    return () => {
      // Cleanup logic, if needed
    };
  }, []);

  const showCategories = categories.map((e)=>e.category)

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      centered
      fullScreen // ={isMobile}
      radius={0}
      transitionProps={{ transition: "fade", duration: 200 }}
      title={"Edit Post"}
    >
      <div className="p-4">
      <div className='w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8'>
          <TextInput
            withAsterisk
            label='Post title'
            className='w-full flex-1'
            placeholder='Post title'
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            label='Category'
            defaultValue={category}
            placeholder={category}
            data={showCategories}
            onChange={(val) => setCategory(val)}
          />

          <label
            className='flex items-center gap-1 text-base   cursor-pointer'
            htmlFor='imgUpload'
          >
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='hidden'
              id='imgUpload'
              data-max-size='5120'
              accept='.jpg, .png, .jpeg'
            />
            <BiImages />
            <span>Post Image</span>
          </label>
        </div>
        <RichTextEditor editor={editor}>
          {editor && (
            <BubbleMenu editor={editor}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Link />
              </RichTextEditor.ControlsGroup>
            </BubbleMenu>
          )}
          <RichTextEditor.Toolbar sticky stickyOffset={20}>
            <RichTextEditor.ColorPicker
              colors={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Control interactive={true}>
                <IconColorPicker size="1rem" stroke={1.5} />
              </RichTextEditor.Control>
              <RichTextEditor.Color color="#F03E3E" />
              <RichTextEditor.Color color="#7048E8" />
              <RichTextEditor.Color color="#1098AD" />
              <RichTextEditor.Color color="#37B24D" />
              <RichTextEditor.Color color="#F59F00" />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.UnsetColor />

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
              <RichTextEditor.CodeBlock />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content value={post.desc} className="py-8" />
        </RichTextEditor>
      </div>

      <div className="w-full flex items-end justify-end mt-6">
        <Button
          className={theme ? "bg-blue-600" : "bg-black"}
          onClick={() => handleSubmit()}
        >
          Submit Post
        </Button>
      </div>

      <Loading visible={isPending} />
      <Toaster richColors />
    </Modal>
  );
};

export default EditPost;
