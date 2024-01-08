export const openUrlInNewTab = (url) => {
    window.open(url, '_blank');
};

export const handleScrollToTop = () => {
    window.scrollTo({
        top: 0
    });
};