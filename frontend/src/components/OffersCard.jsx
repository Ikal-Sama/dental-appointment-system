const OffersCard = () => {
  const offers = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Health Checkup",
      desc: "Doidunt eget semper nec ruam sed hendrerit morbi aeu feliseao augue pellentesue veniam morbi acer.",
    },
    {
      id: 2,
      image:
        "https://plus.unsplash.com/premium_photo-1674368232421-d7f9737293fa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Dental Checkup",
      desc: "Doidunt eget semper nec ruam sed hendrerit morbi aeu feliseao augue pellentesue veniam morbi acer.",
    },
    {
      id: 3,
      image:
        "https://quanticalabs.com/wp_themes/medicenter/files/2018/10/image_02-5.jpg",
      title: "Family Consultation",
      desc: "Doidunt eget semper nec ruam sed hendrerit morbi aeu feliseao augue pellentesue veniam morbi acer.",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-10 ">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="w-[20rem] rounded-md bg-zinc-100 hover:scale-105 transition-all duration-300 ease-in-out shadow-md"
          >
            <div>
              <img
                src={offer.image}
                alt={offer.title}
                className="max-w-[20rem] w-full max-h-[12rem] h-full object-cover rounded-t-md "
              />
            </div>
            <div className="p-3 text-center">
              <h1 className="font-bold text-xl">{offer.title}</h1>
              <p className="text-zinc-500 my-2">{offer.desc}</p>
              <p className="text-sky-500">Read More</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersCard;
