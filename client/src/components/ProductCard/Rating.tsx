import type { IProductReviewRawDoc } from "common/dist/mongoose/product.types.ts";


type Props = {
    reviews: IProductReviewRawDoc[];
    expanded?: boolean;
    single?: number;
}

export default function Rating ({ reviews, expanded = false, single }: Props) {

    const getRating = () => {
        if (!reviews.length) return 0;
        const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        return rating;
    };

    const getStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                    <path fill="currentColor" d="M34 16.78a2.22 2.22 0 0 0-1.29-4l-9-.34a.23.23 0 0 1-.2-.15l-3.11-8.4a2.22 2.22 0 0 0-4.17 0l-3.1 8.43a.23.23 0 0 1-.2.15l-9 .34a2.22 2.22 0 0 0-1.29 4l7.06 5.55a.23.23 0 0 1 .08.24l-2.43 8.61a2.22 2.22 0 0 0 3.38 2.45l7.46-5a.22.22 0 0 1 .25 0l7.46 5a2.2 2.2 0 0 0 2.55 0a2.2 2.2 0 0 0 .83-2.4l-2.45-8.64a.22.22 0 0 1 .08-.24Z" className="clr-i-solid clr-i-solid-path-1" />
                    <path fill="none" d="M0 0h36v36H0z" />
                </svg>);
            } else if ((i - 0.5) <= rating) {
                stars.push(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                    <path fill="currentColor" d="M34 16.78a2.22 2.22 0 0 0-1.29-4l-9-.34a.23.23 0 0 1-.2-.15l-3.11-8.4a2.22 2.22 0 0 0-4.17 0l-3.1 8.43a.23.23 0 0 1-.2.15l-9 .34a2.22 2.22 0 0 0-1.29 4l7.06 5.55a.23.23 0 0 1 .08.24l-2.43 8.61a2.22 2.22 0 0 0 3.38 2.45l7.46-5a.22.22 0 0 1 .25 0l7.46 5a2.2 2.2 0 0 0 2.55 0a2.2 2.2 0 0 0 .83-2.4l-2.45-8.64a.22.22 0 0 1 .08-.24Zm-9.1 6.33l2.45 8.64A.22.22 0 0 1 27 32l-7.46-5a2.2 2.2 0 0 0-1.24-.38V4.44a.2.2 0 0 1 .21.15L21.62 13a2.22 2.22 0 0 0 2 1.46l9 .34a.22.22 0 0 1 .13.4l-7.06 5.55a2.21 2.21 0 0 0-.79 2.36" className="clr-i-solid clr-i-solid-path-1" />
                    <path fill="none" d="M0 0h36v36H0z" />
                </svg>);
            } else {
                stars.push(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                    <path fill="currentColor" d="M27.19 34a2.2 2.2 0 0 1-1.24-.38l-7.46-5a.22.22 0 0 0-.25 0l-7.46 5a2.22 2.22 0 0 1-3.38-2.41l2.45-8.64a.23.23 0 0 0-.08-.24l-7.06-5.55a2.22 2.22 0 0 1 1.29-4l9-.34a.23.23 0 0 0 .2-.15l3.1-8.43a2.22 2.22 0 0 1 4.17 0l3.1 8.43a.23.23 0 0 0 .2.15l9 .34a2.22 2.22 0 0 1 1.29 4L27 22.33a.22.22 0 0 0-.08.24l2.45 8.64A2.23 2.23 0 0 1 27.19 34m-8.82-7.42a2.2 2.2 0 0 1 1.23.42l7.46 5a.22.22 0 0 0 .34-.25l-2.45-8.64a2.21 2.21 0 0 1 .77-2.35l7.06-5.55a.22.22 0 0 0-.13-.4l-9-.34a2.22 2.22 0 0 1-2-1.46l-3.1-8.43a.22.22 0 0 0-.42 0L15.06 13a2.22 2.22 0 0 1-2 1.46l-9 .34a.22.22 0 0 0-.13.4L11 20.76a2.22 2.22 0 0 1 .77 2.35l-2.44 8.64a.21.21 0 0 0 .08.24a.2.2 0 0 0 .26 0l7.46-5a2.2 2.2 0 0 1 1.23-.37Z" className="clr-i-outline clr-i-outline-path-1" />
                    <path fill="none" d="M0 0h36v36H0z" />
                </svg>);
            }
        }
        return stars;
    };

    return (
        <div className={"max-w-max"}>
            <div className={`flex items-center ${expanded && "gap-0.5"}`}>
                {getStars(single ?? getRating()).map((Icon, index) => (
                    <span className={`text-yellow-600 ${expanded ? "size-5 md:size-7" : "size-3 md:size-4"}`} key={"rating_star_con" + index}>{Icon}</span>
                ))}
                {!single && getRating() > 0 && <span className={`ml-1 leading-0 mt-0.5 ${expanded ? "md:text-lg" : "text-[10px] md:text-sm"}`}>({reviews.length})</span>}
            </div>
            {!single && expanded && !reviews.length && (<div className={"italic text-center"}>No reviews yet.</div>)}
        </div>
    );
}