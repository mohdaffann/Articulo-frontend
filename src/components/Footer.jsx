import React from "react";

function Footer() {
    const openGit = () => {
        window.open('https://github.com/mohdaffann', '_blank')
    }
    const openLin = () => {
        window.open('https://www.linkedin.com/in/muhammad-affan-anass/', '_blank')
    }
    return (
        <footer className="w-full py-4 bg-white dark:bg-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center text-center flex-col">
                    <p>Made by MohammedAffan</p>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center hover:opacity-75 transition-opacity cursor-pointer"
                            aria-label="Github Profile"
                            onClick={openGit}
                        >
                            <svg className="h-6 w-6 " role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </button>
                        <button className="flex items-center justify-center hover:opacity-75 transition-opacity cursor-pointer"
                            aria-label="Linkedin Profile"
                            onClick={openLin}
                        >
                            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </footer>

    )
}

export default Footer;
