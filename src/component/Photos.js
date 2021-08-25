import React from "react";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroller";
import { v4 as uid } from "uuid";
import ImageModal from "./ImageModal";

const Photos = ({ loading, handleFetch, flickrParams, photos }) => {
  return (
    <>
      {loading ? (
        <Loading type="top-loader" />
      ) : (
        <main>
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              handleFetch({ ...flickrParams, page: flickrParams.page + 1 })
            }
            hasMore={true || false}
            useWindow={false}
            loader={<Loading />}
          >
            <section className="photos">
              {photos?.map((photo) => (
                <ImageModal key={uid()} photo={photo}>
                  <div
                    className="image-modal-container"
                    style={{
                      backgroundImage: `url('https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </ImageModal>
              ))}
            </section>
          </InfiniteScroll>
        </main>
      )}
    </>
  );
};

export default Photos;
