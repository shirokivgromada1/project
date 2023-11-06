import { useMediaQuery } from "usehooks-ts";
import styles from "./NewsSectionLoading.module.scss";
import { FC } from "react";
import { format } from "date-fns";
import { Skeleton, Typography } from "@mui/material";

const NewsSectionLoading: FC<{}> = (props) => {
  const matches = useMediaQuery("(max-width: 1300px)");
  const mobileMatches = useMediaQuery("(max-width: 740px)");

  return (
    <div {...props}>
      {!mobileMatches && (
        <Typography variant="h4" width={300}>
          <Skeleton />
        </Typography>
      )}
      <div className={styles.newsSection}>
        {Array.from(new Array(4)).map((n, index) => {
          return (
            <div
              key={"news" + index}
              style={{
                gridArea: index === 0 ? "preview" : "news" + index,
                width: "100%",
              }}
            >
              {matches ? (
                index !== 0 ? (
                  <Skeleton
                    variant="rectangular"
                    height={90}
                    width={150}
                    style={{ flexShrink: 0 }}
                  >
                    <img src={n?.node?.image} alt={`img` + index} />{" "}
                  </Skeleton>
                ) : (
                  <Skeleton variant="rectangular" height={180}>
                    <img src={n?.node?.image} alt={`img` + index} />{" "}
                  </Skeleton>
                )
              ) : (
                <Skeleton variant="rectangular">
                  <img src={n?.node?.image} alt={`img` + index} />{" "}
                </Skeleton>
              )}

              <div style={{ width: "100%" }}>
                {index === 0 ? (
                  <>
                    <div>
                      <Typography variant={!mobileMatches ? "h4" : "caption"}>
                        <Skeleton />
                      </Typography>
                      <Typography variant={!mobileMatches ? "h4" : "caption"}>
                        <Skeleton />
                      </Typography>
                    </div>
                    {!mobileMatches && (
                      <div>
                        <Typography variant="body2">
                          <Skeleton />
                        </Typography>
                        <Typography variant="body2">
                          <Skeleton />
                        </Typography>
                        <Typography variant="body2">
                          <Skeleton />
                        </Typography>
                      </div>
                    )}
                    <div>
                      <Typography variant="body1" width={121}>
                        <Skeleton />
                      </Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Typography variant={!mobileMatches ? "h6" : "body2"}>
                        <Skeleton />
                      </Typography>
                      <Typography variant={!mobileMatches ? "h6" : "body2"}>
                        <Skeleton />
                      </Typography>
                    </div>

                    <Typography variant="body1" width={120}>
                      <Skeleton />
                    </Typography>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsSectionLoading;
