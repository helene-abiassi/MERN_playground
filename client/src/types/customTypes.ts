export interface RouteErrorType {
    data:string; 
    error:{
        message:string;
        status:number;
        statusText:string;
    }
}

export interface User extends UserImage {
    username: string;
    email: string;
    password: string;
    bio: string;
    member_since: Date;
    bookmarks: ExpDetails[];
    submissions: ExpDetails[];
  }
  
  export interface ExpDetails {
    author:string;
    title: string;
    publication_date: Date;
    photo: string;
  }
  
  export interface UserImage {
    user_image: string;
  }
  

  export interface Experience extends ExperienceImage {
    author: {
      a_id: string;
      username: string;
      email: string;
      bio: string;
      member_since: Date;
      user_image: string;
    };
    title: string;
    caption: string;
    publication_date: Date;
    location: {
      country: string;
      city: string;
      longitude: string;
      latitude: string;
    };
    experienceType: string;
    text_body: string;
    bookmarked_by:[{
      _id:string,
      usernam:string,
      bio:string,
      member_since:Date,
      user_image:string
    }];
    comments:CommentsType[]


  }
  
  export interface ExperienceImage {
    photo: string;
    photo_body: string | string[];
  }

  export interface CommentsType {
    author: {
      _id: string;
      email: string;
      username: string;
      user_image: string;
    };
    date: Date;
    message: string;
  }
