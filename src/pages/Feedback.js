import React, { useState, useEffect } from 'react';
import ShowcasePostCard from '../components/ShowcasePostCard';

import { connect } from 'react-redux'
import { addShowcasePost, getAllShowcasePosts } from '../actions/showcasePost'
import feedbackImg from '../assets/images/review.png'


const Feedback = ({ isAuthenticated, showcasePosts, addShowcasePost, getAllShowcasePosts }) => {

    const [showcaseUrl, setShowcaseUrl] = useState('');
    const [showcaseText, setShowcaseText] = useState('');
    const [showcaseTitle, setShowcaseTitle] = useState('');


    useEffect(() => {
        getAllShowcasePosts();
    }, [getAllShowcasePosts])

    const handleSubmit = () => {

        console.log(showcaseUrl, showcaseText)
        addShowcasePost({ showcaseUrl, showcaseTitle, showcaseText });

    }


    return (
        <div className="bg-gray-50">
            <div className="flex flex-row">
                <div className="w-8/12">

                    <div className="flex bg-purple-100 my-2 ">
                        <div className=" m-10">
                            <h1 className="text-4xl my-2 font-bold">Showcase and Feedback</h1>
                            <p className="text-xl ">Showcase what you built and get constructive feedback from the members of the makersclub.</p>
                        </div>
                        <img src={feedbackImg} alt="review" className=" w-80 h-40 mt-auto mb-0 ml-auto mr-2 " />
                    </div>

                    <div>
                        {showcasePosts.data && showcasePosts.data.map(post => {
                            return <ShowcasePostCard post={post} />
                        })}



                    </div>

                </div>

                {!isAuthenticated ?
                    <div className="sticky top-24 h-1/2 w-4/12 bg-white border m-4 p-4">
                        <div className="flex flex-row flex-wrap justify-center">
                            <div className="rounded m-2 p-6 bg-yellow-100 text-5xl opacity-80">👨‍💻</div>
                            <div className="rounded m-2 p-6 bg-green-100 text-5xl opacity-80">🛠</div>
                            <div className="rounded m-2 p-6 bg-pink-100 text-5xl opacity-80">‍💬</div>
                            <div className="rounded m-2 p-6 bg-purple-100 text-5xl opacity-80">🚀</div>

                        </div>
                        <button className="my-2 rounded bg-purple-400 hover:bg-purple-500 px-6 py-2 flex text-white text-2xl mx-auto">Sign up now</button>
                        <h1 className="text-xl font-semibold m-6 text-center">and share what you built with the makersclub.</h1>
                    </div>
                    :

                    <div className="sticky top-24 h-1/2 w-4/12 bg-white border m-4 p-4">

                        <h1 className="text-xl m-2">Hey everyone, I built</h1>

                        <input
                            onChange={(e) => setShowcaseTitle(e.target.value)}
                            placeholder="themakersclub"
                            className="my-2 text-xl bg-gray-50 border-2 w-full p-2 rounded" />

                        <input
                            onChange={(e) => setShowcaseUrl(e.target.value)}
                            placeholder="https://makerclub.vercel.app"
                            className="text-xl bg-gray-50 border-2 w-full p-2 rounded" />

                        <textarea
                            onChange={(e) => setShowcaseText(e.target.value)}
                            placeholder="What's your project is about?"
                            className="my-2 h-60 text-xl bg-gray-50 border-2 w-full p-2 rounded" />
                        <button
                            onClick={() => handleSubmit()}
                            className=" flex mx-auto text-xl bg-gray-700 text-white p-2 px-4 my-2 rounded">Showcase</button>

                    </div>
                }

            </div>

        </div>
    );
}

const mapStateToProps = state => ({
    showcasePosts: state.showcasePostsReducer.showcasePosts,
    isAuthenticated: state.authReducer.isAuthenticated

})

export default connect(mapStateToProps, { addShowcasePost, getAllShowcasePosts })(Feedback);