import * as React from "react"
import clsx from 'clsx';
import useStyles from './styles';

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  const classes = useStyles();

  return (
    <svg
      viewBox="0 0 455 470.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx(classes.root, props.className)}
    >
      <path
        className={classes.topRight}
        d="M65.41 336.909c15.91-15.91 41.649-15.91 57.559 0s15.91 41.649 0 57.559-41.578 15.98-57.488.07-15.98-41.72-.07-57.629zM343.532 72.968c15.91-15.91 41.649-15.91 57.559 0s15.91 41.648 0 57.558-41.649 15.91-57.559 0c-15.768-15.91-15.839-41.72 0-57.558zM117.628 305.625l42.921 42.922 39.315-39.315c-9.404-3.748-18.172-9.405-25.88-17.112a77.553 77.553 0 01-17.112-25.88l-39.244 39.385zM310.513 200.679l39.316-39.315-42.922-42.922-39.315 39.315c9.405 3.748 18.173 9.405 25.88 17.112 7.637 7.637 13.294 16.405 17.041 25.81z"
      />
      <path
        className={classes.bottomRight}
        d="M342.172 392.44c-15.91-15.91-15.91-41.65 0-57.56s41.648-15.91 57.558 0 15.91 41.65 0 57.56c-15.84 15.839-41.72 15.839-57.558 0zM69.555 126.805c-15.91-15.91-15.91-41.649 0-57.559s41.648-15.91 57.558 0 15.91 41.649 0 57.559-41.648 15.91-57.558 0zM303.657 346.866l42.921-42.921-39.315-39.316c-3.747 9.405-9.404 18.173-17.112 25.88a77.553 77.553 0 01-25.88 17.113l39.386 39.244zM203.117 155.518L163.8 116.203l-42.92 42.921 39.314 39.316c3.748-9.405 9.405-18.173 17.112-25.88 7.566-7.567 16.405-13.294 25.81-17.042z"
      />
      <path
        className={classes.top}
        d="M274.97 40.7c0 22.5-18.2 40.7-40.7 40.7s-40.7-18.2-40.7-40.7S211.77 0 234.27 0s40.7 18.2 40.7 40.7zM274.97 429.436c0 22.5-18.2 40.7-40.7 40.7s-40.7-18.2-40.7-40.7 18.2-40.7 40.7-40.7 40.7 18.2 40.7 40.7zM249.08 102.703h-25.6v50.4c4.2-.7 8.4-1.1 12.8-1.1s8.6.4 12.8 1.1v-50.4zM249.08 319.265c-4.2.7-8.4 1.1-12.8 1.1s-8.6-.4-12.8-1.1v50.4h25.6v-50.4z"
      />
      <path
        className={classes.right}
        d="M414.3 264.66c-22.5 0-40.7-18.2-40.7-40.7s18.2-40.7 40.7-40.7 40.7 18.2 40.7 40.7-18.2 40.7-40.7 40.7zM40.67 271.57c-22.5 0-40.7-18.2-40.7-40.7s18.2-40.7 40.7-40.7 40.7 18.2 40.7 40.7-18.2 40.7-40.7 40.7zM310.8 243.68h50.4v-25.6h-50.4c.7 4.2 1.1 8.4 1.1 12.8s-.4 8.6-1.1 12.8zM154.24 243.68c-.7-4.2-1.1-8.4-1.1-12.8s.4-8.6 1.1-12.8h-50.4v25.6h50.4z"
      />
      <path
        className={classes.center}
        d="M290.74 233.844c0 31.8-25.8 57.7-57.7 57.7s-57.7-25.8-57.7-57.7 25.8-57.7 57.7-57.7 57.7 25.9 57.7 57.7z"
      />
    </svg>
  )
}

export default Logo;