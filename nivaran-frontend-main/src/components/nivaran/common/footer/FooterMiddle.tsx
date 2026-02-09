export const FooterMiddle = () => {
  return (
    <div className="flex flex-col gap-4 md:w-1/3 w-full text-sm md:text-base text-gray-700">
      {/* Contact Information */}
      <p className="leading-relaxed">
        If you need assistance with your donation, please email us at&nbsp;
        <a
          href="mailto:laxman.p@nivaranfoundation.org"
          className="text-primary-main font-semibold hover:underline"
        >
          laxman.p@nivaranfoundation.org
        </a>
        , or contact us through our supporter services online form.
      </p>

      {/* Organization Details */}
      <p className="leading-relaxed">
        <span className="font-bold text-primary-main">NIVARAN FOUNDATION</span>{" "}
        is a 501(c)(3) not-for-profit organization.
      </p>

      {/* Copyright */}
      <p className="text-sm text-gray-600 md:text-gray-500">
        &copy; {new Date().getFullYear()} NIVARAN. All rights reserved.
      </p>
    </div>
  );
};
