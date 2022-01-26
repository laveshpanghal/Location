import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import Loader from "../Loader/Loader";
import { toastError, toastSuccess } from "../Utility/Toast";
import { ShareButton } from "../Utility/UtilityButton";

const GetArticle = ({ article, match, auth }) => {
  const [data, setData] = useState();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const time = match.params.time;
    const key = match.params.key;

    if (article && article[key].createdAt === time) {
      setData(article[key]);
    } else {
      API.get("articleAPI", `/article/indexed/article/${time}`)
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          toastError("Something went wrong " + err.message);
        });
    }
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      checkActivity(data, auth);
    }
  }, [data]);

  function incrementLike(article) {
    const apiName = "articleAPI";
    const path = "/article";
    const myInit = {
      body: {
        ...article,
        likes: (article.likes ? article.likes : 0) + 1,
      },
    };

    API.put(apiName, path, myInit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function decrementLike(article) {
    const apiName = "articleAPI";
    const path = "/article";
    const myInit = {
      body: {
        ...article,
        likes: (article.likes ? article.likes : 0) - 1,
      },
    };

    API.put(apiName, path, myInit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteActivity(article, auth) {
    const apiName = "activityApi";
    const path = `/activity/object/${article.articleId}/${auth.username}`;
    const myInit = {};

    API.del(apiName, path, myInit)
      .then((res) => {
        console.log(res);
        setLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function uploadActivity(article, auth) {
    console.log("Inside upload");
    const apiName = "activityApi";
    const path = "/activity";
    const myInit = {
      body: {
        postTypeId: article.articleId,
        userId: auth.username,
        name: auth.attributes.name,
      },
    };

    API.post(apiName, path, myInit)
      .then((res) => {
        console.log(res);
        setLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkActivity(article, auth) {
    const apiName = "activityApi";
    const path = `/activity/${article.articleId}/${auth.username}`;
    const myInit = {};

    API.get(apiName, path, myInit)
      .then((res) => {
        console.log(res);
        if (res.length > 0) {
          setLiked(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function likeButtonClicked(article, auth) {
    incrementLike(article);
    uploadActivity(article, auth);
  }

  function unLikeButtonClicked(article, auth) {
    decrementLike(article);
    deleteActivity(article, auth);
  }

  return (
    <div className="container mx-auto">
      {data ? (
        <div className="px-6 mt-2">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row align-start justify-start">
              <div className="mr-2">
                <img
                  className="h-10 object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                  alt="Avatar"
                />
              </div>
              <div>
                <div className="text-base font-medium">
                  {data.name ? data.name : ""}{" "}
                </div>
                <div className="text-sm">
                  {data.createdAt
                    ? new Date(data.createdAt).toDateString()
                    : ""}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around items-center">
              {!liked ? (
                <span
                  className="w-6 ml-4"
                  onClick={(_e) => likeButtonClicked(data, auth)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="stroke-current text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </span>
              ) : (
                <span
                  className="w-6 ml-4"
                  onClick={(_e) => unLikeButtonClicked(data, auth)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="fill-current text-red-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              <span className="w-6 ml-4">
                <ShareButton />
              </span>
            </div>
          </div>
          <div className="">
            <article
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto prose-indigo mt-4"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></article>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.article,
    match: ownProps.match,
    auth: state.auth,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GetArticle);
