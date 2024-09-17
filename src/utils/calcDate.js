const calcDate = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return +diffDays;
};

export const displayDateFunc = (startDate, endDate) => {
    const start = new Date((startDate)?.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const end = new Date((endDate)?.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

    return {
        startDate: `${String(start.getDate()).padStart(2, '0')}/${String(start.getMonth() + 1).padStart(2, '0')}/${start.getFullYear()}`,
        endDate: `${String(end.getDate()).padStart(2, '0')}/${String(end.getMonth() + 1).padStart(2, '0')}/${end.getFullYear()}`
    }
}

export function isSameDay(date1, date2) {
    const format2 = new Date(date2);
    return date1.toDateString() === format2.toDateString();
}

export function convertUnixTime(unixTime) {
    // Chuyển đổi thành milliseconds
    const milliseconds = unixTime * 1000;
    const date = new Date(milliseconds);

    // Điều chỉnh múi giờ Việt Nam
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
    };

    // Định dạng ngày tháng theo múi giờ Việt Nam
    const formattedDate = date.toLocaleString('vi-VN', options);

    // Lấy giờ và xác định AM/PM
    const hours = date.getUTCHours() + 7;
    const amPm = hours < 12 ? 'AM' : 'PM';

    const [timePart, datePart] = formattedDate.split(' ');
    const finalFormattedDate = `${datePart} ${timePart}`;

    return {
        time: finalFormattedDate,
        amPm
    };
}

export function formatChatTimestamp(isoDateString) {
    const date = new Date(isoDateString);
    const now = new Date();
    
    // Chuyển về thời gian của Việt Nam (GMT+7)
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    // Tính toán múi giờ Việt Nam (GMT+7)
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        month: 'short',
        day: 'numeric',
    };
    
    if (diffInSeconds < 20) {
        return "a few seconds ago";
    } else if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks} weeks ago`;
    } else if (diffInMonths < 12) {
        return date.toLocaleDateString('en-US', options);  // VD: Sep 7
    } else {
        return `${diffInYears} years ago`;
    }
}

export default calcDate;