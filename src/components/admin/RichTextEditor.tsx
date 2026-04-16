"use client";

import "./rich-text-editor.css";
import { useCallback, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  ImageIcon,
  Minus,
  Pilcrow,
} from "lucide-react";

type Props = {
  name?: string;
  initialHtml: string;
  fieldId?: string;
};

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded border px-1.5 text-charcoal transition-colors ${
        active
          ? "border-gold-accent bg-champagne text-navy"
          : "border-border-light bg-white hover:bg-sand-warm"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name = "content",
  initialHtml,
  fieldId = "post-content-html",
}: Props) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
          italic: false,
          strike: false,
          code: false,
          codeBlock: false,
          underline: false,
          link: false,
        }),
        LinkExtension.configure({
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { class: "underline decoration-charcoal-light/70" },
        }),
        ImageExtension.configure({
          allowBase64: false,
          HTMLAttributes: { class: "rounded-lg max-w-full" },
        }),
        Placeholder.configure({
          placeholder: "Write your post…",
          emptyEditorClass: "is-editor-empty",
        }),
      ],
      content: initialHtml || "",
      editorProps: {
        attributes: {
          class: "tiptap max-w-none text-sm text-charcoal",
        },
      },
    },
    []
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL (https://…)");
    if (!url?.trim()) return;
    editor.chain().focus().setImage({ src: url.trim() }).run();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const el = hiddenRef.current;
    if (!el) return;
    const sync = () => {
      el.value = editor.getHTML();
    };
    sync();
    editor.on("update", sync);
    return () => {
      editor.off("update", sync);
    };
  }, [editor]);

  if (!editor) {
    return (
      <div
        className="tiptap-wrap rounded-button border border-border-light bg-sand-warm/40"
        aria-hidden
      >
        <div className="h-[280px] animate-pulse rounded-button bg-border-light/30" />
      </div>
    );
  }

  return (
    <div className="tiptap-wrap rounded-button border border-border-light bg-white shadow-soft">
      <div
        className="flex flex-wrap gap-1 border-b border-border-light bg-sand-warm/40 px-2 py-2"
        role="toolbar"
        aria-label="Formatting"
      >
        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Paragraph"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Divider"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton title="Image" onClick={addImage}>
          <ImageIcon className="h-4 w-4" strokeWidth={1.75} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} className="max-w-none" />
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        id={fieldId}
        defaultValue={initialHtml}
      />
    </div>
  );
}
