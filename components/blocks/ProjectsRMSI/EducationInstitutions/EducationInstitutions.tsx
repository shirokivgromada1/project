import styles from "./EducationInstitutions.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsEducationInstitutions } from "@/tina/__generated__/types";
import useBetterMediaQuery from "../../../../hooks/useBetterMediaQuery";
export const EducationInstitutions = ({
  data,
}: {
  data: PageComponentsEducationInstitutions;
}) => {
  const match = useBetterMediaQuery("(max-width: 768px)");
  const isPhone = useBetterMediaQuery("(max-width: 390px)");

  const { title, institution: institutions } = data;
  const extractPhoneNumber = (text: string) => {
    const phoneNumberMatch = text.match(/\+[\d\s()-]+/);
    return phoneNumberMatch ? phoneNumberMatch[0] : "No phone number available";
  };
  return (
    <main className={styles.educationInstitution}>
      <div className="container">
        <h1>заклади освіти</h1>
        <table className={styles.educationInstitution__inner}>
          <thead>
            <tr>
              <th>Назва</th>
              <th>Контакти</th>
              <th>Адреса</th>
            </tr>
          </thead>
          <tbody>
            {institutions &&
              institutions.map(
                (i, index) =>
                  i &&
                  !i.hidden && (
                    <tr key={index} data-tina-field={tinaField(i)}>
                      <td className={styles.educationInstitution__inner_name}>
                        {i.title && (
                          <h5 data-tina-field={tinaField(i.title, "name")}>
                            {i?.title?.name}
                          </h5>
                        )}
                        {i.title && (
                          <h5 data-tina-field={tinaField(i.title, "director")}>
                            {isPhone
                              ? i?.title?.director
                                ? i.title.director
                                    .split(":")
                                    .map((line, index) => (
                                      <>
                                        {index > 0 && <br />}
                                        {line}
                                      </>
                                    ))
                                : null
                              : i?.title?.director}
                          </h5>
                        )}
                      </td>
                      <td
                        className={styles.educationInstitution__inner_contacts}
                      >
                        {match ? <h5>Контакти:</h5> : null}
                        {i.institutionContacts && (
                          <h5
                            data-tina-field={tinaField(
                              i.institutionContacts,
                              "email"
                            )}
                          >
                            {i?.institutionContacts?.email}
                          </h5>
                        )}
                        {match
                          ? extractPhoneNumber(
                              i?.institutionContacts?.phone as string
                            )
                          : i?.institutionContacts?.phone}
                      </td>
                      <td
                        className={styles.educationInstitution__inner_address}
                      >
                        {i.institutionAddress && (
                          <h5
                            data-tina-field={tinaField(i, "institutionAddress")}
                          >
                            {i?.institutionAddress}
                          </h5>
                        )}
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
