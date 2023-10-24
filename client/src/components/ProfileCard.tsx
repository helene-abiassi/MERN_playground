function ProfileCard() {
  return (
    <div>
      <div className="profileColumns">
        <div className="profileColumnLeft">
          <p className="inputKeys">photo:</p>
          <img
            src="https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697397728/voyageApp/userPhoto.png"
            alt=""
          />
        </div>
        <div className="profileColumn">
          <p className="inputKeys">username:</p>
          <p className="inputKeys">email:</p>
          <p className="inputKeys">password:</p>
          <p className="inputKeys">member since:</p>
          <p className="inputKeys">bio:</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque,
            molestiae expedita quod unde nihil id delectus. Modi aut ducimus
            illum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
