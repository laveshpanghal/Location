import React, { useState } from "react";
import { API } from "aws-amplify";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { toastError, toastSuccess } from "../Utility/Toast";

const CreateArticle = ({ auth }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setConvertedContent(currentContentAsHTML);
  };

  function uploadArticle(e) {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    const eventData = {
      userId: auth.username,
      articleId: uuidv4(),
      content: convertedContent,
      title: content.blocks[0].text,
      liner: content.blocks[1].text,
      createdAt: new Date(),
      name: auth.attributes.name,
      likes: 0,
      comments: [],
      articleName: "article",
    };

    API.post("articleAPI", "/article", {
      body: {
        ...eventData,
      },
    })
      .then((res) => {
        toastSuccess("Article Published");
      })
      .catch((err) => {
        toastSuccess("Something went wrong " + err.message);
      });
  }

  return (
    <div className="container mx-auto">
      <div className="container mx-auto lg:mt-12 px-4 md:px-32">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">Write a story ...</div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:ring-indigo-500 my-4"
            onClick={(e) => uploadArticle(e)}
          >
            Publish
          </button>{" "}
        </div>
        <div className="mt-8">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="p-4 border"
            editorClassName="p-4 border bg-gray-200"
            toolbarClassName="border"
          />
        </div>
        <div className="mt-8">
          <div className="text-3xl font-bold mt-4">Article View</div>
          <div className="border mt-8 pb-16 flex justify-center items-center">
            <article
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto prose-indigo mt-8"
              dangerouslySetInnerHTML={{ __html: convertedContent }}
            ></article>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, _ownProps) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
