import styles from "./StarostinskDistricts.module.scss";
import { tinaField } from "tinacms/dist/react";
import { PageComponentsStarostinskDistricts } from "@/tina/__generated__/types";
import Link from "next/link";
import { useState } from "react";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import ArrowDown from "../../../assets/arrow-down-small.svg";
import { motion } from "framer-motion";
import Image from "next/image";

export const StarostinskDistricts = ({ data }: { data: PageComponentsStarostinskDistricts }) => {
    const { title, districts: districts } = data;
    const [activeIndicesOdd, setActiveIndicesOdd] = useState<any>({});
    const [activeIndicesEven, setActiveIndicesEven] = useState<any>({});
    const isTablet = useBetterMediaQuery("(min-width: 451px) and (max-width: 768px)");
    const isMobile = useBetterMediaQuery("(max-width: 450px");

    const toggleAccordionItem = (index: number, isOdd: boolean) => {
        if (isOdd) {
            setActiveIndicesOdd((prevState: any) => ({
                ...prevState,
                [index]: !prevState[index],
            }));
        } else {
            setActiveIndicesEven((prevState: any) => ({
                ...prevState,
                [index]: !prevState[index],
            }));
        }
    };

    const accordionVariants = {
        open: { opacity: 1, display: "flex" },
        closed: { opacity: 0, display: "none" },
    };

    const renderDistricts = (districts: any, isOdd: boolean) => {
        return districts.map((d: any, index: number) =>
            !d?.hidden ? (
                <div  data-tina-field={tinaField(d)} className={styles.districts__list_item} key={d.id as number}>
                    <button onClick={() => toggleAccordionItem(d?.id as number, isOdd)}>
                        <div className={styles.districts__list_item_overall}>
                            <h3 data-tina-field={tinaField(d, "name")}>{d?.name}</h3>
                            <ArrowDown />
                        </div>
                        {!isMobile && <p data-tina-field={tinaField(d, "captain")}>{d?.captain}</p>}
                    </button>
                    <motion.div
                        className={`${styles.districts__list_item_info} ${
                            (isOdd ? activeIndicesOdd : activeIndicesEven)[d.id as number] ? "show" : "hidden"
                        }`}
                        initial="closed"
                        animate={(isOdd ? activeIndicesOdd : activeIndicesEven)[d.id as number] ? "open" : "closed"}
                        variants={accordionVariants}
                        transition={{ duration: 1 }}
                        layout
                    >
                        {isMobile && <p data-tina-field={tinaField(d, "captain")}>{d?.captain}</p>}
                        {d?.image && <Image data-tina-field={tinaField(d, "image")} src={d.image} width={125} height={125} alt="headman" />}
                        <div>
                            <div>
                                <h3 data-tina-field={tinaField(d, "contactsTitle")}>{d?.contactsTitle}</h3>
                                <ul>
                                    <li data-tina-field={tinaField(d, "contactsPhone")}> {d?.contactsPhone}</li>
                                    <li data-tina-field={tinaField(d, "contactsAddress")}> {d?.contactsAddress}</li>
                                </ul>
                            </div>
                            <div>
                                <h3 data-tina-field={tinaField(d, "scheduleTitle")}>{d?.scheduleTitle}</h3>
                                <p data-tina-field={tinaField(d, "scheduleDate")}>{d?.scheduleDate}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ) : null
        );
    };

    const oddDistricts = districts?.filter((d, index) => !d?.hidden && index % 2 === 0);
    const evenDistricts = districts?.filter((d, index) => !d?.hidden && index % 2 === 1);

    return (
        <main className={styles.districts}>
            <div className="container">
                <h1 data-tina-field={tinaField(data, "title")}>{title}</h1>
                <div className={styles.districts__list}>
                    <div>{oddDistricts && renderDistricts(oddDistricts, true)}</div>
                    <div>{evenDistricts && renderDistricts(evenDistricts, false)}</div>
                </div>
            </div>
        </main>
    );
};
